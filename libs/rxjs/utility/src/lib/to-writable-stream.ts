/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction, Subject, throwError } from 'rxjs';
import { catchError, finalize, switchMap, takeUntil, tap } from 'rxjs/operators';

/**
 * Returns the source Observable, emitting it through the passed
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/WritableStream|WritableStream} and handling the internal
 * subscription state and error handling
 *
 * @category Streams
 *
 * @param stream The Writer object to emit the data to
 * @params abortWriterOnError Optional On RxJS call abort instead of close on the writer
 *
 * @example Write an array of Observable values to a `WritableStream`
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
  abortWriterOnError = false,
): MonoTypeOperatorFunction<T> {
  // Here we check if there is a getWriter method to support WritableStreamDefaultWriter
  const writer: WritableStreamDefaultWriter = (stream as any)?.getWriter ? (stream as any).getWriter() : stream;

  let closed = false;

  // We want to really make sure we clean up
  const writerClosed$ = new Subject();

  // Sets up a listener on the closed getter, when fired this sets the closed value to true and fires the writerClosed$
  // subject to ensure the subscription ends
  if (writer.closed) {
    writer.closed
      .then(() => {
        closed = true;
        writerClosed$.next();
      })
      .catch(() => {
        closed = true;
        writerClosed$.next();
      });
  }

  return (source) =>
    source.pipe(
      takeUntil(writerClosed$),
      tap((value) => writer.write(value)),
      catchError(async (error) => {
        closed = true;
        try {
          if (abortWriterOnError) {
            await writer.abort(error);
          } else {
            await writer.close();
          }
        } catch {
          // Do nothing
        }
        return throwError(error);
      }),
      finalize(async () => {
        try {
          !closed && (await writer.close());
        } catch {
          // Do nothing
        }
      }),
      switchMap(() => source),
    );
}
