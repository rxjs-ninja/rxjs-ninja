import { from } from 'rxjs';
import { observe } from 'rxjs-marbles/jest';
import { finalize, take } from 'rxjs/operators';
import { tapOnSubscribe } from './tap-on-subscribe';

describe('tapOnSubscribe', () => {
  it(
    'tap on each subscription',
    observe(() => {
      const mock = jest.fn();

      const input = from([1, 2, 3]).pipe(tapOnSubscribe(() => mock('Test')));
      input.pipe(take(2)).subscribe();
      input.pipe(take(3)).subscribe();

      return input.pipe(finalize(() => expect(mock).toHaveBeenNthCalledWith(3, 'Test')));
    }),
  );
});
