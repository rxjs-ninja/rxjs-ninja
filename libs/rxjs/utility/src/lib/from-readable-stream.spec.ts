import { observe } from 'rxjs-marbles/jest';
import { fromReadableStream } from '@rxjs-ninja/rxjs-utility';
import { reduce, tap } from 'rxjs/operators';

describe('fromReadableSource', () => {
  beforeAll(() => {
    (global as any).WritableStream = jest.fn().mockImplementation((input) => {
      return {
        enqueue: (value: any) => input.write(value),
        close: () => input.close(),
      };
    });
    (global as any).ReadableSteam = jest.fn().mockImplementation(() => {
      return {
        cancel: () => Promise.resolve(),
        pipeTo: (writer: any) => {
          for (let i = 0; i < 100; i++) {
            writer.enqueue(i);
          }
          writer.close();

          return Promise.resolve();
        },
      };
    });
  });

  it(
    'should create an Observable from a readable source',
    observe(() => {
      const stream = (global as any).ReadableSteam();

      return fromReadableStream<number>(stream as any).pipe(
        reduce((a, b) => a + b, 0),
        tap((val) => expect(val).toBe(4950)),
      );
    }),
  );
});
