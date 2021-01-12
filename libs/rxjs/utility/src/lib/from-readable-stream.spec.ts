import { observe } from 'rxjs-marbles/jest';
import { fromReadableStream } from '@rxjs-ninja/rxjs-utility';
import { catchError, reduce, tap } from 'rxjs/operators';
import { ReadableStream, WritableStream } from 'web-streams-polyfill/ponyfill';
import { of } from 'rxjs';

describe('fromReadableSource', () => {
  beforeAll(() => {
    (global as any).WritableStream = WritableStream;
  });

  it(
    'should create an Observable from a readable source',
    observe(() => {
      const stream = new ReadableStream({
        start: (controller) => {
          for (let i = 0; i < 100; i++) {
            controller.enqueue(i);
          }
          controller.close();
        },
      });

      return fromReadableStream<number>(stream).pipe(
        reduce((a, b) => a + b, 0),
        tap((val) => expect(val).toBe(4950)),
      );
    }),
  );

  xit(
    'should stop emitting when an abort signal is received',
    observe(() => {
      const abort = new AbortController();
      const signal = abort.signal;

      const stream = new ReadableStream({
        start: (controller) => {
          for (let i = 0; i < 100; i++) {
            controller.enqueue(i);
          }
          controller.close();
        },
      });

      return fromReadableStream<number>(stream, signal).pipe(
        tap((val) => {
          if (val === 50) {
            abort.abort();
          }
        }),
        reduce((a, b) => a + b, 0),
        catchError((val) => of(true)),
        tap((val) => expect(val).toBe(100)),
      );
    }),
  );
});
