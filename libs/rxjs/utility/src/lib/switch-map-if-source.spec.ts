import { mapIfSource, switchMapIfSource } from '@rxjs-ninja/rxjs-utility';
import { marbles } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('switchMapIfSource', () => {
  it(
    'should return correct result based on predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-(d|)', { a: 'Jack', b: 'Mary', c: 'Jack', d: 'Mary' });
      const subs = '^------!';
      const expected = m.cold('-a-b-c-(d|)', {
        a: 'Cow',
        b: 'Lamb',
        c: 'Cow',
        d: 'Lamb',
      });
      m.expect(
        input.pipe(
          switchMapIfSource<string>(
            (value) => value.toLowerCase() === 'jack',
            () => of('Cow'),
            () => of('Lamb'),
          ),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
