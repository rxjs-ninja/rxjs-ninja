import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { map } from 'rxjs/operators';
import { switchMapIf } from './switch-map-if';

describe('switchMapIf', () => {
  it(
    'should return an Observable result of the passed value with same type',
    marbles((m) => {
      const input = m.hot('-a-b-c-(d|)', { a: 'Cow', b: 'Lamb', c: 'Pig', d: 'Chicken' });
      const subs = '^------!';
      const expected = m.cold('-a-b-c-(d|)', {
        a: 'Jack gets the Cow',
        b: 'Mary gets the Lamb',
        c: 'Jack gets the Pig',
        d: 'Mary gets the Chicken',
      });
      m.expect(
        input.pipe(
          switchMapIf(
            (value) => value.length <= 3,
            (value) => of(`Jack gets the ${value}`),
            (value) => of(`Mary gets the ${value}`),
          ),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an Observable result of the passed different type',
    marbles((m) => {
      const input = m.hot('-a-b-c-(d|)', { a: 'Cow', b: 'Lamb', c: 'Pig', d: 'Chicken' });
      const subs = '^------!';
      const expected = m.cold('-a-b-c-(d|)', {
        a: false,
        b: true,
        c: false,
        d: true,
      });
      m.expect(
        input.pipe(
          switchMapIf<string, boolean, boolean>(
            (value) => value.length <= 3,
            () => of(false),
            () => of(true),
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
          switchMapIf<number, string, number>(
            (value) => value % 15 == 0 || value % 3 == 0 || value % 5 == 0,
            (value) => of(value).pipe(map((v) => (v % 15 == 0 ? `FizzBuzz` : v % 3 === 0 ? 'Fizz' : 'Buzz'))),
            (value) => of(value),
          ),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
