/**
 * Minimal ReadableStream surface used by {@link fromReadableStream}.
 * Compatible with DOM and ponyfill implementations.
 */
export interface ReadableStreamLike<T> {
  readonly locked: boolean;
  pipeTo(
    destination: WritableStream<T>,
    options?: {
      signal?: AbortSignal;
    },
  ): Promise<void>;
  cancel(reason?: unknown): Promise<void>;
}
