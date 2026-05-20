import { marbles } from 'rxjs-marbles';
import { fromArray } from './from-array';

describe('fromArray', () => {
  it(
    'should emit an array from an iterable',
    marbles((m) => {
      m.expect(fromArray('abc')).toBeObservable(m.cold('(x|)', { x: ['a', 'b', 'c'] }));
    }),
  );
});