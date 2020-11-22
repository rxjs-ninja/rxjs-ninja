import { parseInt } from '@rxjs-ninja/rxjs-number';
import { marbles } from 'rxjs-marbles/jest';

describe('parseInt', () => {
  it(
    'should return parsed integer values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-', { a: '-1', b: '0', c: '1', d: '2.3', e: '3.14' });
      const expected = m.cold('-w-v-x-y-z-', { w: -1, v: 0, x: 1, y: 2, z: 3 });
      m.expect(input.pipe(parseInt())).toBeObservable(expected);
    }),
  );

  it(
    'should return parsed integer values with radix',
    marbles((m) => {
      const input = m.hot('-a-b-c-', { a: '0', b: '60', c: 'ff' });
      const expected = m.cold('-x-y-z-', { x: 0, y: 96, z: 255 });
      m.expect(input.pipe(parseInt(16))).toBeObservable(expected);
    }),
  );
});
