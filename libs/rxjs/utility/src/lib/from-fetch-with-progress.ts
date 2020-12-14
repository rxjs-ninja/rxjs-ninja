/**
 * @packageDocumentation
 * @module Utility
 */

import { fromEvent, Observable, Subject } from 'rxjs';
import { map, scan, takeUntil, takeWhile } from 'rxjs/operators';

/**
 * @private
 * @internal
 * Returns an Observable from {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API|fetch} that emits
 * a number during the progress of the file download and once finished emits a
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array|Uint8Array}
 *
 * @category Observable Utilities
 *
 * @param input A `string` url or {@link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request|Request}
 *   object
 * @param init Optional `RequestInit` dictionary
 * @param controller Optional {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortController|AbortController}
 *   used to cancel any outstanding requests
 */
export function fromFetchWithProgress(
  input: RequestInfo,
  init: RequestInit = {},
  controller = new AbortController(),
): Observable<number | Uint8Array> {
  const { signal } = controller;
  const data$ = new Subject<ReadableStreamReadResult<Uint8Array>>();

  return new Observable((subscriber) => {
    fetch(input, { ...init, signal })
      .then(async ({ body, headers, ok, status, statusText }) => {
        if (!body) {
          throw new Error('Response body is empty');
        }
        if (!ok) {
          throw new Error(`${status}: ${statusText}`);
        }

        const reader = body.getReader();
        const total = Number(headers.get('content-length'));

        data$
          .pipe(
            scan<ReadableStreamReadResult<Uint8Array>, Uint8Array | number[]>(
              (acc, { done, value = [] }) => (done ? Uint8Array.from([...acc, ...value]) : [...acc, ...value]),
              [],
            ),
            map((value) => (value instanceof Uint8Array ? value : value.length / (total === 0 ? value.length : total))),
            takeWhile((result) => typeof result === 'number', true),
            takeUntil(fromEvent(signal, 'abort')),
          )
          .subscribe(subscriber);

        const process = async (
          result: ReadableStreamReadResult<Uint8Array>,
        ): Promise<ReadableStreamReadResult<Uint8Array>> => {
          data$.next(result);
          return !result.done ? reader.read().then(process) : Promise.resolve(result);
        };

        return reader.read().then(process);
      })
      .catch((error) => subscriber.error(error));

    return () => controller && controller.abort();
  });
}
