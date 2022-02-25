import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { map } from 'rxjs/operators';
import { match } from './match';

describe('match', () => {
  it(
    'should match a string pattern inside a string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'Mary had a little lamb', b: 'Belittled', c: 'test' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'little', y: 'little', z: null });
      m.expect(
        input.pipe(
          match('little'),
          map((val) => (val ? val.toString() : null)),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should match a string pattern inside a string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'Mary had a little lamb', b: 'Belittled', c: 'test' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'little', y: 'little', z: null });
      m.expect(
        input.pipe(
          match(of('little')),
          map((val) => (val ? val.toString() : null)),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should match a regex pattern inside a string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'Mary had a Little Lamb', b: 'Belittled', c: 'test' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'M', y: 'B', z: null });
      m.expect(
        input.pipe(
          match(/[A-Z]/),
          map((val) => (val ? val.toString() : null)),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should match a regex pattern inside a string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'Mary had a Little Lamb', b: 'Belittled', c: 'test' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'M', y: 'B', z: null });
      m.expect(
        input.pipe(
          match(of(/[A-Z]/)),
          map((val) => (val ? val.toString() : null)),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should match a global regex pattern inside a string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'Mary had a Little Lamb', b: 'Belittled', c: 'test' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'M,L,L', y: 'B', z: null });
      m.expect(
        input.pipe(
          match(/[A-Z]/g),
          map((val) => (val ? val.toString() : null)),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
