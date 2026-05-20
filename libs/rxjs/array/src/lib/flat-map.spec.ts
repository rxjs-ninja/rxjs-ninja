import { marbles } from 'rxjs-marbles';
import { flatMap } from './flat-map';

describe('flatMap', () => {
  it(
    'should map and flatten the source array',
    marbles((m) => {
      const input = m.hot('-a-|', { a: ['ab', 'cd'] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: ['a', 'b', 'c', 'd'] });
      m.expect(input.pipe(flatMap((v) => [...v]))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
