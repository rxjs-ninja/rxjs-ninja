import { split } from '@tinynodes/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('split', () => {
  it(
    'should split a string into an array at the separator',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Name,Age,Street' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: ['Name', 'Age', 'Street'] });
      m.expect(input.pipe(split(','))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
