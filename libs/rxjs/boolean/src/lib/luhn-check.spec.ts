/**
 * @packageDocumentation
 * @module utility
 */
import { luhnCheck } from './luhn-check';
import { marbles } from 'rxjs-marbles/jest';

describe('luhnCheck', () => {
  it(
    'return truthy for a Luhn check with strings',
    marbles((m) => {
      const input = m.hot('-a-b|', { a: '1231432153213212', b: '4485275742308327' });
      const expected = m.cold('-x-y|', { x: false, y: true });
      m.expect(input.pipe(luhnCheck())).toBeObservable(expected);
    }),
  );

  it(
    'return truthy for a Luhn check with numbers',
    marbles((m) => {
      const input = m.hot('-a-b|', { a: 1231432153213212, b: 4485275742308327 });
      const expected = m.cold('-x-y|', { x: false, y: true });
      m.expect(input.pipe(luhnCheck())).toBeObservable(expected);
    }),
  );
});
