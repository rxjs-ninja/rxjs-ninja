import { marbles } from 'rxjs-marbles';
import { some } from './some';
import { filterSome } from './filter-some';

describe('filterSome', () => {
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
