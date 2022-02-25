import { marbles } from 'rxjs-marbles/jest';
import { mapCodePoint } from './map-code-point';

describe('mapCodePoint', () => {
  it(
    'should return a string from a code point',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 9731, b: 9733, c: 9842 });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: '☃', y: '★', z: '♲' });
      m.expect(input.pipe(mapCodePoint())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a string from a code point array',
    marbles((m) => {
      const input = m.hot('-a-b-|', { a: [9731, 9733, 9842], b: [9731, 9734, 9843] });
      const subs = '^----!';
      const expected = m.cold('-y-z-|', { y: '☃★♲', z: '☃☆♳' });
      m.expect(input.pipe(mapCodePoint())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
