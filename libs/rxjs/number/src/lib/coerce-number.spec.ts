import { marbles } from 'rxjs-marbles/jest';
import { coerceNumber } from './coerce-number';

describe('coerceNumber', () => {
  it(
    'should coerce values to numbers',
    marbles((m) => {
      const input = m.hot('-a-b-|', { a: '42', b: '-3' });
      const subs = '^----!';
      const expected = m.cold('-x-y-|', { x: 42, y: -3 });
      m.expect(input.pipe(coerceNumber())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});