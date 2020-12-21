/**
 * @packageDocumentation

 */
import { luhnCheck } from '@rxjs-ninja/rxjs-boolean';
import { marbles } from 'rxjs-marbles/jest';

describe('luhnCheck', () => {
  it(
    'return truthy for a Luhn check with strings',
    marbles((m) => {
      const input = m.hot('-a-(b|)', { a: '1231432153213212', b: '4485275742308327' });
      const subs = '^--!';
      const expected = m.cold('-x-(y|)', { x: false, y: true });
      m.expect(input.pipe(luhnCheck())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'return truthy for a Luhn check with numbers',
    marbles((m) => {
      const input = m.hot('-a-(b|)', { a: 1231432153213212, b: 4485275742308327 });
      const subs = '^--!';
      const expected = m.cold('-x-(y|)', { x: false, y: true });
      m.expect(input.pipe(luhnCheck())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
