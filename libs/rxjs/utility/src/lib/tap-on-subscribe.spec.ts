import { from } from 'rxjs';
import { tapOnSubscribe } from '@tinynodes/rxjs-utility';
import { finalize, take } from 'rxjs/operators';
import { observe } from 'rxjs-marbles/jest';

describe('tapOnSubscribe', () => {
  it(
    'tap on each subscription',
    observe(() => {
      const mock = jest.fn();

      const input = from([1, 2, 3]).pipe(tapOnSubscribe(() => mock()));
      input.pipe(take(1)).subscribe();
      input.pipe(take(1)).subscribe();

      return input.pipe(finalize(() => expect(mock).toHaveBeenCalledTimes(3)));
    }),
  );
});
