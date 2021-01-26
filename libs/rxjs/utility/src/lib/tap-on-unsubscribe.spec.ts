import { from } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { observe } from 'rxjs-marbles/jest';
import { tapOnUnsubscribe } from '@rxjs-ninja/rxjs-utility';

describe('tapOnUnsubscribe', () => {
  it(
    'tap on each unsubscribe',
    observe(() => {
      const mock = jest.fn();

      const input = from([1, 2, 3]).pipe(tapOnUnsubscribe(() => mock('Test')));
      input.pipe(take(2)).subscribe();
      input.pipe(take(3)).subscribe();

      return input.pipe(finalize(() => expect(mock).toHaveBeenNthCalledWith(2, 'Test')));
    }),
  );
});
