import { from } from 'rxjs';
import { tapIf } from './tap-if';
import { observe } from 'rxjs-marbles/jest';
import { finalize } from 'rxjs/operators';

describe('tapIf', () => {
  it(
    'tap only if the predicate is truthy ',
    observe(() => {
      const isEven = (num: number): boolean => num % 2 == 0;

      const mock = jest.fn();
      return from([1, 2, 3, 4, 5]).pipe(
        tapIf(isEven, () => mock()),
        finalize(() => expect(mock).toHaveBeenCalledTimes(2)),
      );
    }),
  );
});
