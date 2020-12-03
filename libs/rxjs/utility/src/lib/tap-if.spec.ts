import { from } from 'rxjs';
import { tapIf } from '@rxjs-ninja/rxjs-utility';
import { observe } from 'rxjs-marbles/jest';
import { finalize } from 'rxjs/operators';

describe('tapIf', () => {
  it(
    'tap only if the predicate is truthy ',
    observe(() => {
      const isEven = (num: number): boolean => num % 2 == 0;
      const mock = jest.fn();
      return from([1, 2, 3, 4, 5]).pipe(
        tapIf(isEven, (val) => mock(val)),
        finalize(() => {
          expect(mock).toHaveBeenNthCalledWith(1, 2);
          expect(mock).toHaveBeenNthCalledWith(2, 4);
        }),
      );
    }),
  );

  it(
    'never taps if values are falsy ',
    observe(() => {
      const ltZero = (num: number): boolean => num < 0;
      const mock = jest.fn();
      return from([1, 2, 3, 4, 5]).pipe(
        tapIf(ltZero, (val) => mock(val)),
        finalize(() => expect(mock).not.toHaveBeenCalled()),
      );
    }),
  );
});
