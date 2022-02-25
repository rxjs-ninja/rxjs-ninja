import { marbles } from 'rxjs-marbles/jest';
import { trim, trimEnd, trimStart } from './trim-string';

describe('trim', () => {
  it(
    'should trim a string at both ends',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'one ', b: ' two', c: ' three ' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'one', y: 'two', z: 'three' });
      m.expect(input.pipe(trim())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});

describe('trimStart', () => {
  it(
    'should trim a string on the left',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'one ', b: ' two', c: ' three ' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'one ', y: 'two', z: 'three ' });
      m.expect(input.pipe(trimStart())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});

describe('trimEnd', () => {
  it(
    'should trim a string on the right',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'one ', b: ' two', c: ' three ' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'one', y: ' two', z: ' three' });
      m.expect(input.pipe(trimEnd())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
