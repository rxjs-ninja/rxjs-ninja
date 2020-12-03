import { trim, trimLeft, trimRight, trimString } from '@rxjs-ninja/rxjs-string';
import { TrimPosition } from '../types/position';
import { marbles } from 'rxjs-marbles/jest';

describe('trimString', () => {
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

describe('trimLeft', () => {
  it(
    'should trim a string on the left',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'one ', b: ' two', c: ' three ' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'one ', y: 'two', z: 'three ' });
      m.expect(input.pipe(trimLeft())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});

describe('trimRight', () => {
  it(
    'should trim a string on the right',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'one ', b: ' two', c: ' three ' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'one', y: ' two', z: ' three' });
      m.expect(input.pipe(trimRight())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});

describe('trim', () => {
  it(
    'should trim a string on both ends',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'one ', b: ' two', c: ' three ' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'one', y: 'two', z: 'three' });
      m.expect(input.pipe(trim())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
