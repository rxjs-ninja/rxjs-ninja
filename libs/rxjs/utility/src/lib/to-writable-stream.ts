/**
 * @packageDocumentation
 * @module Utility
 */
import { EMPTY, from, MonoTypeOperatorFunction, throwError } from 'rxjs';
import { catchError, finalize, mergeMap, switchMap, tap } from 'rxjs/operators';

/**
 * Returns the source Observable, emitting it through the passed WritableStream and handling the internal
 * subscription state and error handling. If passed an
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal|AbortSignal} the WritableStream can be ended
 * early without ending the entire subscription
 *
 * @category Streams
 *
 * @see {@link https://stackblitz.com/edit/rxjs-writable-stream|Writable Stream Demo}
 *
 * @param stream The Writer object to emit the data to
 * @param signal Optional signal used to end the writer without ending the rest of the stream
 *
 * @example Write an array of Observable values to a WritableStream
 * ```ts
 * let result = ''
 * const stream = new WritableStream({
 *   write: (chunk) => result += chunk,
 *   close: () => console.log(result)
 * });
 *
 * const input = ['Hello', ' ', 'RxJS', ' ', 'Ninja'];
 * from(input).pipe(toWritableStream(stream)).subscribe();
 * ```
 * Output: `Hello RxJS Ninja`
 *
 * @returns Observable that emits the source observable after performing a write to the WritableStream
 */
export function toWritableStream<T extends unknown>(
  stream: WritableStream<T> | WritableStreamDefaultWriter<T>,
  signal?: AbortSignal,
): MonoTypeOperatorFunction<T> {
  // Here we check if there is a getWriter method to support WritableStreamDefaultWriter
  // eslint-disable-next-line
  const writer: WritableStreamDefaultWriter = (stream as any)?.getWriter ? (stream as any).getWriter() : stream;

  let closed = false;

  // If there is a signal passed add a handler for the abort method and attempt to close the writer
  if (signal) {
    signal.onabort = () => {
      closed = true;
      from(writer.close())
        .pipe(catchError(() => EMPTY))
        .subscribe();
    };
  }

  return (source) =>
    source.pipe(
      tap((value) => {
        // Attempt to write to the writer is not closed, if there is an error don't pass it on
        if (!closed) {
          from(writer.ready)
            .pipe(mergeMap(() => from(writer.write(value)).pipe(catchError(() => EMPTY))))
            .subscribe();
        }
      }),
      catchError((error) => {
        closed = true;
        // Attempt to close the writer then always return the original error
        /* istanbul ignore next */
        return from(writer.close()).pipe(switchMap(() => throwError(error)));
      }),
      finalize(() => {
        closed = true;
        // Attempt to close any open writer, don't emit any error
        from(writer.close())
          .pipe(catchError(() => EMPTY))
          .subscribe();
      }),
    );
}
