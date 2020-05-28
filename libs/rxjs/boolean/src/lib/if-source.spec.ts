import { ifSource } from './if-source';
import { marbles } from 'rxjs-marbles/jest';

describe('ifSource', () => {
  it(
    'should return correct result based on predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-(d|)', { a: 'Jack', b: 'Mary', c: 'Jack', d: 'Mary' });
      const subs = '^------!';
      const expected = m.cold('-a-b-c-(d|)', {
        a: 'Jack has a Cow',
        b: 'Mary has a Lamb',
        c: 'Jack has a Cow',
        d: 'Mary has a Lamb',
      });
      m.expect(
        input.pipe(
          ifSource<string>(
            (value) => value.toLowerCase() === 'jack',
            (value) => `${value} has a Cow`,
            (value) => `${value} has a Lamb`,
          ),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return correct result based on predicate with one type switch',
    marbles((m) => {
      const input = m.hot('-a-b-c-(d|)', { a: 0, b: 24, c: 42, d: 100 });
      const subs = '^------!';
      const expected = m.cold('-a-b-c-(d|)', {
        a: '0 is NOT the ultimate answer!',
        b: '24 is NOT the ultimate answer!',
        c: '42 is the ultimate answer!',
        d: '100 is NOT the ultimate answer!',
      });
      m.expect(
        input.pipe(
          ifSource<number, string>(
            (value) => value === 42,
            (value) => `${value} is the ultimate answer!`,
            (value) => `${value} is NOT the ultimate answer!`,
          ),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return correct result based on predicate with one two type switches',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-(e|)', { a: 1, b: 3, c: 5, d: 15, e: 16 });
      const subs = '^--------!';
      const expected = m.cold('-a-b-c-d-(e|)', {
        a: 1,
        b: 'Fizz',
        c: 'Buzz',
        d: 'FizzBuzz',
        e: 16,
      });
      m.expect(
        input.pipe(
          ifSource<number, string, number>(
            (value) => value % 15 == 0 || value % 3 == 0 || value % 5 == 0,
            (value) => (value % 15 == 0 ? `FizzBuzz` : value % 3 === 0 ? 'Fizz' : 'Buzz'),
            (value) => value,
          ),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
