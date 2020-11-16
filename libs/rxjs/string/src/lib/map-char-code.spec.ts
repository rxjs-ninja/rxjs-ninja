import { mapCharCode } from './map-char-code';
import { marbles } from 'rxjs-marbles/jest';

describe('mapCharCode', () => {
  it(
    'should return a string from a char code',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 65, b: 66, c: 67 });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'A', y: 'B', z: 'C' });
      m.expect(input.pipe(mapCharCode())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a string from a char code array',
    marbles((m) => {
      const input = m.hot('-a-b-|', { a: [65, 66, 67], b: [35, 36, 37, 38] });
      const subs = '^----!';
      const expected = m.cold('-y-z-|', { y: 'ABC', z: '#$%&' });
      m.expect(input.pipe(mapCharCode())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
