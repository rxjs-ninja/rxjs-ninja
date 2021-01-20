import { switchMapIf } from '@rxjs-ninja/rxjs-utility';
import { marbles } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

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
});
