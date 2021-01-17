import { charAt } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('charAt', () => {
  it(
    'should return the character at the passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'foo', c: 'a' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 's', y: 'o', z: '' });
      m.expect(input.pipe(charAt(2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the character at the Obervable passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'foo', c: 'a' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 's', y: 'o', z: '' });
      m.expect(input.pipe(charAt(of(2)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
