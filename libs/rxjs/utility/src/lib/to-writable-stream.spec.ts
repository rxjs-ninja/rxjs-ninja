import { observe } from 'rxjs-marbles/jest';
import { fromReadableStream, toWritableStream } from '@rxjs-ninja/rxjs-utility';
import { finalize, reduce, tap } from 'rxjs/operators';
import { from } from 'rxjs';

describe('fromReadableSource', () => {
  let inner: any;

  beforeAll(() => {
    inner = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      write: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      abort: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      close: () => {},
    };

    (global as any).WritableStream = jest.fn(() => ({
      getWriter: () => inner,
    }));
  });

  it(
    'should create an Observable from a readable source',
    observe(() => {
      const stream = (global as any).WritableStream();
      spyOn(inner, 'write');

      return from([1, 2, 3, 4, 5]).pipe(
        toWritableStream(stream),
        finalize(() => {
          expect(inner.write).toHaveBeenCalledTimes(5);
        }),
      );
    }),
  );
});
