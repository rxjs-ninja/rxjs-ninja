import { toString } from '@rxjs-ninja/rxjs-number';
import { marbles } from 'rxjs-marbles/jest';

describe('toString', () => {
  it(
    'should return string of number',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-', { a: -1, b: 0, c: 1, d: 2.3, e: 3.14 });
      const expected = m.cold('-w-v-x-y-z-', {
        w: '-1',
        v: '0',
        x: '1',
        y: '2.3',
        z: '3.14',
      });
      m.expect(input.pipe(toString())).toBeObservable(expected);
    }),
  );

  it(
    'should return string of number with radix',
    marbles((m) => {
      const input = m.hot('-a-b-c-', { a: 0, b: 96, c: 255 });
      const expected = m.cold('-x-y-z-', {
        x: '0',
        y: '60',
        z: 'ff',
      });
      m.expect(input.pipe(toString(16))).toBeObservable(expected);
    }),
  );
});
