import { marbles } from 'rxjs-marbles';
import { every } from '@rxjs-ninja/rxjs-array';
import { fill } from './fill';

describe('fill', () => {
  it(
    'should return a filled array of values',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0], b: [1], c: [0, 1] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['RxJS'], y: ['RxJS'], z: ['RxJS', 'RxJS'] });
      m.expect(input.pipe(fill('RxJS'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a filled array of values from a different start position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0, 0, 0, 0, 0], b: [1, 0, 0, 0, 0], c: [0, 1, 0, 0, 0] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [0, 1, 1, 1, 1], y: [1, 1, 1, 1, 1], z: [0, 1, 1, 1, 1] });
      m.expect(input.pipe(fill(1, 1))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a filled array of values from a different start and end position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0, 0, 0, 0, 0], b: [1, 0, 0, 0, 0], c: [0, 1, 0, 0, 0] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [0, 1, 1, 1, 0], y: [1, 1, 1, 1, 0], z: [0, 1, 1, 1, 0] });
      m.expect(input.pipe(fill(1, 1, 4))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
