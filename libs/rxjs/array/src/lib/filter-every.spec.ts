import { marbles } from 'rxjs-marbles';
import { filterEvery } from './filter-every';

describe('filterEvery', () => {
  it(
    'should return the array if the array contains values that are Boolean truthy',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [1, 0, 1, 0, 1, 0], b: [0, 0, 0, 0], c: [1, 1, 2, 2] });
      const subs = '^------!';
      const expected = m.cold('-----z-|', { z: [1, 1, 2, 2] });
      m.expect(input.pipe(filterEvery())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the array if the array contains values that pass the predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: [1, 0, 1, 0, 1, 0],
        b: [1, 0, 2, 1, 0, 2],
        c: [0, 1, 0, 1, 0, 2],
      });
      const subs = '^------!';
      const expected = m.cold('-x-----|', { x: [1, 0, 1, 0, 1, 0] });
      m.expect(input.pipe(filterEvery((v) => v < 2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return true if the array contains all truthy string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: ['', '', ''],
        b: ['', 'Hello', 'RxJS'],
        c: ['Hello', 'RxJS', 'Ninja'],
      });
      const subs = '^------!';
      const expected = m.cold('-----z-|', { z: ['Hello', 'RxJS', 'Ninja'] });
      m.expect(input.pipe(filterEvery())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return true if the array contains all truthy string with predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: ['', '', ''],
        b: ['', 'Foo', 'Bar'],
        c: ['Foo', 'Bar', 'Baz'],
      });
      const subs = '^------!';
      const expected = m.cold('-----z-|', { z: ['Foo', 'Bar', 'Baz'] });
      m.expect(input.pipe(filterEvery((v) => v.length < 4))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
