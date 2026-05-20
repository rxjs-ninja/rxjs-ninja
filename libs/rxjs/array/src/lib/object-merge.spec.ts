import { marbles } from 'rxjs-marbles';
import { objectMerge } from './object-merge';

describe('objectMerge', () => {
  it(
    'should merge properties into the source object',
    marbles((m) => {
      const input = m.hot('-a-|', { a: { a: 1 } });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: { a: 1, c: 3 } });
      m.expect(input.pipe(objectMerge({ c: 3 }))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});