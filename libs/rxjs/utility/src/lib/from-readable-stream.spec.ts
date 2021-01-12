import { observe } from 'rxjs-marbles/jest';
import { fromReadableStream } from '@rxjs-ninja/rxjs-utility';
import { reduce, tap } from 'rxjs/operators';
import { ReadableStream, WritableStream } from 'web-streams-polyfill/ponyfill';

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
});
