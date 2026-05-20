import { marbles } from 'rxjs-marbles';
import { fromArrayOf } from './from-array-of';

describe('fromArrayOf', () => {
  it(
    'should emit an array of the given values',
    marbles((m) => {
      m.expect(fromArrayOf(1, 2, 3)).toBeObservable(m.cold('(x|)', { x: [1, 2, 3] }));
    }),
  );
});