import { observe } from 'rxjs-marbles/jest';
import { fromReadableStream, toWritableStream } from '@rxjs-ninja/rxjs-utility';
import { finalize, map, reduce, switchMap, take, tap } from 'rxjs/operators';
import { from, of, throwError } from 'rxjs';

describe('toWritableStream', () => {
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

  it(
    'should end writing to the writable stream on subscription end',
    observe(() => {
      const stream = (global as any).WritableStream();
      spyOn(inner, 'write');

      return from([1, 2, 3, 4, 5]).pipe(
        take(3),
        toWritableStream(stream),
        finalize(() => {
          expect(inner.write).toHaveBeenCalledTimes(3);
        }),
      );
    }),
  );

  xit(
    'should end writing to the writable stream on error',
    observe(() => {
      const stream = (global as any).WritableStream();
      spyOn(inner, 'write');

      return from([1, 2, 3, 4, 5]).pipe(
        switchMap((val) => {
          console.log(val, val < 4);
          if (val < 4) {
            return of(val);
          } else {
            return throwError('Number is 4');
          }
        }),
        toWritableStream(stream),
        finalize(() => {
          expect(inner.write).toHaveBeenCalledTimes(3);
        }),
      );
    }),
  );
});
