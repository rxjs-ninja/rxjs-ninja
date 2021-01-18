import { mapIf } from '@rxjs-ninja/rxjs-utility';
import { marbles } from 'rxjs-marbles/jest';

describe('mapIf', () => {
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
          mapIf<string>(
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
          mapIf<number, string>(
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
          mapIf<number, string, number>(
            (value) => value % 15 == 0 || value % 3 == 0 || value % 5 == 0,
            (value) => (value % 15 == 0 ? `FizzBuzz` : value % 3 === 0 ? 'Fizz' : 'Buzz'),
            (value) => value,
          ),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return correct result based on the same value multiplied',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-(e|)', { a: 1, b: 2, c: 3, d: 4, e: 5 });
      const subs = '^--------!';
      const expected = m.cold('-a-b-c-d-(e|)', {
        a: 20,
        b: 20,
        c: 60,
        d: 40,
        e: 100,
      });
      m.expect(
        input.pipe(
          mapIf(
            (value) => value % 2 == 0,
            (value) => value * 10,
            (value) => value * 20,
          ),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
