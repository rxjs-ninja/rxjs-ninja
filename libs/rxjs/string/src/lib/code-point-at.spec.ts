import { codePointAt } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('codePointAt', () => {
  it(
    'should return the code point at the passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: '☃', b: '★', c: '♲' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [9731], y: [9733], z: [9842] });
      m.expect(input.pipe(codePointAt(0))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the code point at the passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: '☃★', b: '★☃', c: '♲' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [9733], y: [9731], z: [NaN] });
      m.expect(input.pipe(codePointAt(of(1)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the code point at the passed array of position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: '☃★', b: '★☃', c: '♲' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [9731, 9733], y: [9733, 9731], z: [9842, NaN] });
      m.expect(input.pipe(codePointAt([0, 1]))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the code point at the passed Observable array of position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: '☃★', b: '★☃', c: '♲' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [9731, 9733], y: [9733, 9731], z: [9842, NaN] });
      m.expect(input.pipe(codePointAt(of([0, 1])))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
