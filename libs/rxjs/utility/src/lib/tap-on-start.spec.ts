import { observe } from 'rxjs-marbles/jest';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { tapOnStart } from './tap-on-start';

describe('tapOnStart', () => {
  it(
    'should only be called on the first value',
    observe(() => {
      const mock = jest.fn();
      return from([1, 2, 3]).pipe(
        tapOnStart((val) => mock(val)),
        finalize(() => {
          expect(mock).toHaveBeenNthCalledWith(1, 1);
          expect(mock).toHaveBeenCalledTimes(1);
        }),
      );
    }),
  );
});
