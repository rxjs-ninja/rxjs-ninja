import { toLocaleString } from './to-locale-string';
import { marbles } from 'rxjs-marbles/jest';

describe('toLocaleString', () => {
  it(
    'should return string of a locale formatted number',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-', { a: -1, b: 0, c: 1000000, d: 2300, e: 3.14 });
      const expected = m.cold('-w-v-x-y-z-', {
        w: '-1',
        v: '0',
        x: '1,000,000',
        y: '2,300',
        z: '3.14',
      });
      m.expect(input.pipe(toLocaleString('en-GB'))).toBeObservable(expected);
    }),
  );

  it(
    'should return string of a locale formatted number with Intl options',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-', { a: -1, b: 0, c: 1000000, d: 2300, e: 3.14 });
      const expected = m.cold('-w-v-x-y-z-', {
        w: '-€1.00',
        v: '€0.00',
        x: '€1,000,000.00',
        y: '€2,300.00',
        z: '€3.14',
      });
      m.expect(input.pipe(toLocaleString('en-GB', { currency: 'EUR', style: 'currency' }))).toBeObservable(expected);
    }),
  );
});
