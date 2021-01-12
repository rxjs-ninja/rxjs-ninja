/**
 * @packageDocumentation
 * @module Utility
 */
import { Observable } from 'rxjs';

/**
 * Creates an Observable source from a
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream|ReadableStream} source
 *
 * @category Streams
 *
 * @param stream The `ReadableStream` to subscribe to
 * @param signal Optional {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal|AbortSignal} to provide
 *   to the underlying stream
 * @param queueStrategy Optional strategy for backpressure queueing
 *
 * @example Create a ReadableStream of `0` to `100` and convert to an Observable
 * ```ts
 * const stream = new ReadableStream({
 *   start: (controller) => {
 *    for (let i = 0; i <100; i++) {
 *      controller.enqueue(i)
 *    }
 *    controller.close();
 *   }
 * });
 *
 * fromReadableStream(stream).pipe(reduce((a, b) => a + b)).subscribe();
 * ```
 * Output: `4950`
 *
 * @returns Observable that emits from a `ReadableStream` source
 */
export function fromReadableStream<T extends unknown>(
  stream: ReadableStream<T>,
  signal?: AbortSignal,
  queueStrategy?: QueuingStrategy,
): Observable<T> {
  return new Observable<T>((subscriber) => {
    stream
      .pipeTo(
        new WritableStream<T>(
          {
            write: (value) => subscriber.next(value),
            abort: () => {
              if (!subscriber.closed) {
                subscriber.complete();
              }
            },
            close: () => {
              if (!subscriber.closed) {
                subscriber.complete();
              }
            },
          },
          queueStrategy,
        ),
        { signal },
      )
      .then(() => !subscriber.closed && subscriber.complete());

    return () => !stream.locked && stream.cancel();
  });
}
