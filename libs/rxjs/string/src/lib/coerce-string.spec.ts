import { marbles } from 'rxjs-marbles/jest';
import { coerceString } from './coerce-string';

describe('coerceString', () => {
  it(
    'should coerce values to strings',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 42 });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: '42' });
      m.expect(input.pipe(coerceString())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});