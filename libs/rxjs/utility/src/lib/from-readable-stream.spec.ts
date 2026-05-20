import { observe } from 'rxjs-marbles/jest';
import { fromReadableStream } from '@rxjs-ninja/rxjs-utility';
import { catchError, reduce, tap } from 'rxjs/operators';
import { CountQueuingStrategy, ReadableStream, WritableStream } from 'web-streams-polyfill/ponyfill';
import { of } from 'rxjs';
import { ReadableStreamLike } from '../types/streams';

function createNumberStream(): ReadableStreamLike<number> {
  return new ReadableStream<number>({
    start: (controller) => {
      for (let i = 0; i < 100; i++) {
        controller.enqueue(i);
      }
      controller.close();
    },
  });
}

describe('fromReadableSource', () => {
  beforeAll(() => {
    Object.assign(globalThis, { WritableStream, CountQueuingStrategy });
  });

  it(
    'should create an Observable from a readable source',
    observe(() => {
      const stream = createNumberStream();

      return fromReadableStream<number>(stream).pipe(
        reduce((a, b) => a + b, 0),
        tap((val) => expect(val).toBe(4950)),
      );
    }),
  );

  it(
    'should stop emitting when an abort signal is received',
    observe(() => {
      const abort = new AbortController();
      const signal = abort.signal;

      const stream = createNumberStream();

      return fromReadableStream<number>(stream, signal).pipe(
        tap((val) => {
          if (val === 50) {
            abort.abort();
          }
        }),
        reduce((a, b) => a + b, 0),
        tap((val) => expect(val).toBe(1275)),
      );
    }),
  );

  it(
    'should create support a different queue strategy',
    observe(() => {
      const stream = createNumberStream();

      const queue = new CountQueuingStrategy({ highWaterMark: 10 });

      return fromReadableStream<number>(stream, undefined, queue).pipe(
        reduce((a, b) => a + b, 0),
        tap((val) => expect(val).toBe(4950)),
      );
    }),
  );

  it(
    'should throw an error when emitting an abort signal',
    observe(() => {
      const abort = new AbortController();
      const signal = abort.signal;

      const stream = createNumberStream();

      return fromReadableStream<number>(stream, signal, undefined, true).pipe(
        tap((val) => {
          if (val === 50) {
            abort.abort();
          }
        }),
        reduce((a, b) => a + b, 0),
        catchError((error: Error) => {
          expect(error.message).toMatch(/aborted/i);
          return of(true);
        }),
      );
    }),
  );
});
