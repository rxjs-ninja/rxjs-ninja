import { parseFloat } from './parse-float';
import { marbles } from 'rxjs-marbles/jest';

describe('parseFloat', () => {
  it(
    'should return parsed float values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-', { a: '-1', b: '0', c: '1', d: '2.3', e: '3.14' });
      const expected = m.cold('-w-v-x-y-z-', { w: -1, v: 0, x: 1, y: 2.3, z: 3.14 });
      m.expect(input.pipe(parseFloat())).toBeObservable(expected);
    }),
  );
});
