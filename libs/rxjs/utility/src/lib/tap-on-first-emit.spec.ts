import { observe } from 'rxjs-marbles/jest';
import { from } from 'rxjs';
import { finalize, map, reduce, tap } from 'rxjs/operators';
import { tapOnFirstEmit } from '@rxjs-ninja/rxjs-utility';

describe('tapOnStart', () => {
  it(
    'should only be called on the first value',
    observe(() => {
      const mock = jest.fn();
      return from([1, 2, 3]).pipe(
        tapOnFirstEmit((val) => mock(val)),
        reduce((acc, val) => acc + val),
        tap((value) => expect(value).toBe(6)),
        finalize(() => {
          expect(mock).toHaveBeenNthCalledWith(1, 1);
          expect(mock).toHaveBeenCalledTimes(1);
        }),
      );
    }),
  );
});
