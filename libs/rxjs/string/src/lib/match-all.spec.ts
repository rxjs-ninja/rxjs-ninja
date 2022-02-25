import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { map } from 'rxjs/operators';
import { matchAll } from './match-all';

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
          map((value) => {
            const result = [];
            for (const v of value) {
              result.push(v);
            }
            return result.toString();
          }),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should match all string pattern inside a string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test1', b: 'testing1', c: 'foobar' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'test1,e,st1,1', y: 'test,e,st,', z: '' });
      m.expect(
        input.pipe(
          matchAll(of(/t(e)(st(\d?))/g)),
          map((value) => {
            const result = [];
            for (const v of value) {
              result.push(v);
            }
            return result.toString();
          }),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
