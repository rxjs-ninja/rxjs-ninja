import { marbles } from 'rxjs-marbles';
import { filterSome } from '@rxjs-ninja/rxjs-array';

describe('filterSome', () => {
  it(
    'should return an array that contains all values where one is Boolean truthy',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0, 0, 0, 0], b: [0, 0, 0, 1], c: [1, 0, 1, 0] });
      const subs = '^------!';
      const expected = m.cold('---y-z-|', { y: [0, 0, 0, 1], z: [1, 0, 1, 0] });
      m.expect(input.pipe(filterSome())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array that contains all values where one value passed the predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['RxJS', 'Ninja'], b: ['RxJS', 'Rocks'], c: ['Fizz', 'Buzz'] });
      const subs = '^------!';
      const expected = m.cold('-x-y---|', { x: ['RxJS', 'Ninja'], y: ['RxJS', 'Rocks'] });
      m.expect(input.pipe(filterSome((v) => v === 'RxJS'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
