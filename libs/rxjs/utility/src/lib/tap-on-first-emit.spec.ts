import { from } from 'rxjs';
import { observe } from 'rxjs-marbles/jest';
import { finalize, reduce, tap } from 'rxjs/operators';
import { tapOnFirstEmit } from './tap-on-first-emit';

describe('tapOnStart', () => {
  it(
    'should only be called on the first value',
    observe(() => {
      const mock = jest.fn();
      return from([1, 2, 3]).pipe(
        tapOnFirstEmit(() => mock('Test')),
        reduce((acc, val) => acc + val),
        tap((value) => expect(value).toBe(6)),
        finalize(() => {
          expect(mock).toHaveBeenNthCalledWith(1, 'Test');
          expect(mock).toHaveBeenCalledTimes(1);
        }),
      );
    }),
  );
});
