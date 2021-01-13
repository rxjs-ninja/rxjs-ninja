/**
 * @packageDocumentation
 * @module Utility
 */
import { Observable, Subscriber } from 'rxjs';

/**
 * Creates an Observable source from a
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream|ReadableStream} source that will emit any
 * values emitted by the stream.
 *
 * @category Streams
 *
 * @param stream The `ReadableStream` to subscribe to
 * @param signal Optional {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal|AbortSignal} to provide
 *   to the underlying stream
 * @param queueStrategy Optional strategy for backpressure queueing
 * @param throwEndAsError Optional to return an error when the `AbortSignal` has been fired instead of just closing
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
  throwEndAsError = false,
): Observable<T> {
  /**
   * @private
   * @internal
   * @param subscriber
   */
  function createStream(subscriber: Subscriber<T>) {
    return new WritableStream<T>(
      {
        write: (value) => subscriber.next(value),
        abort: (error) => {
          if (throwEndAsError) {
            subscriber.error(error);
          } else if (!subscriber.closed) {
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
    );
  }

  return new Observable<T>((subscriber) => {
    stream
      .pipeTo(createStream(subscriber), { signal })
      .then(() => !subscriber.closed && subscriber.complete())
      .catch((error) => subscriber.error(error));

    return () => !stream.locked && stream.cancel();
  });
}
