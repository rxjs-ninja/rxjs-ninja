import { trimString } from '@tinynodes/rxjs-string';
import { TrimPosition } from '../types/position';
import { marbles } from 'rxjs-marbles/jest';

describe('trim string', () => {
  it(
    'should trim a string at both ends',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'one ', b: ' two', c: ' three ' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'one', y: 'two', z: 'three' });
      m.expect(input.pipe(trimString())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should trim a string only at the start',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'one ', b: ' two', c: ' three ' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'one ', y: 'two', z: 'three ' });
      m.expect(input.pipe(trimString(TrimPosition.START))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should trim a string only at the end',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'one ', b: ' two', c: ' three ' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'one', y: ' two', z: ' three' });
      m.expect(input.pipe(trimString(TrimPosition.END))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
