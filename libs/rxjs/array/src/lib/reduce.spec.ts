import { marbles } from 'rxjs-marbles';
import { reduce } from './reduce';

describe('reduce', () => {
  it(
    'should reduce the source array with a seed value',
    marbles((m) => {
      const input = m.hot('-a-b-|', {
        a: [1, 2, 3],
        b: [10, 20],
      });
      const subs = '^----!';
      m.expect(input.pipe(reduce((acc, curr) => acc + curr, 0))).toBeObservable(m.cold('-x-y-|', { x: 6, y: 30 }));
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
