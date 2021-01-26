import { from } from 'rxjs';
import { tapOnSubscribe } from '@rxjs-ninja/rxjs-utility';
import { finalize, take } from 'rxjs/operators';
import { observe } from 'rxjs-marbles/jest';

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
