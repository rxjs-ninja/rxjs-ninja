import { marbles } from 'rxjs-marbles';
import { objectAssign } from './object-assign';

describe('objectAssign', () => {
  it(
    'should assign properties onto the source object',
    marbles((m) => {
      const input = m.hot('-a-|', { a: { a: 1 } });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: { a: 1, b: 2 } });
      m.expect(input.pipe(objectAssign({ b: 2 }))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});