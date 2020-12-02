import { observe } from 'rxjs-marbles/jest';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { startWithTap, tapOnStart } from './tap-on-start';

describe('tapOnStart', () => {
  it(
    'should only be called on the first value',
    observe(() => {
      const mock = jest.fn();
      return from([1, 2, 3]).pipe(
        startWithTap(() => mock()),
        finalize(() => expect(mock).toHaveBeenCalledTimes(1)),
      );
    }),
  );
});
