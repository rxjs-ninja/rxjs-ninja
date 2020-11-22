import { matchAll } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';
import { map } from 'rxjs/operators';

describe('matchAll', () => {
  it(
    'should match all string pattern inside a string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test1', b: 'testing1', c: 'foobar' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'test1,e,st1,1', y: 'test,e,st,', z: '' });
      m.expect(
        input.pipe(
          matchAll(/t(e)(st(\d?))/g),
          map((val) => (val ? val.toString() : null)),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
