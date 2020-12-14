import { marbles } from 'rxjs-marbles';
import { filterSome } from '@rxjs-ninja/rxjs-array';

describe('filterSome', () => {
  it(
    'should return an array that contains all values where one is Boolean truthy',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0, 0, 0, 0], b: [0, 0, 0, 1], c: [1, 0, 1, 0] });
      const subs = '^------!';
      const expected = m.cold('---y-z-|', { y: [0, 0, 0, 1], z: [1, 0, 1, 0] });
      m.expect(input.pipe(filterSome())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return true if the array contains some truthy string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: ['', '', ''],
        b: ['', 'Hello', 'RxJS'],
        c: ['Hello', 'RxJS', 'Ninja'],
      });
      const subs = '^------!';
      const expected = m.cold('---y-z-|', {
        y: ['', 'Hello', 'RxJS'],
        z: ['Hello', 'RxJS', 'Ninja'],
      });
      m.expect(input.pipe(filterSome())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array that contains truthy numbers with predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0, 0, 0, 0], b: [0, 0, 0, 1], c: [1, 0, 1, 2] });
      const subs = '^------!';
      const expected = m.cold('-----z-|', { z: [1, 0, 1, 2] });
      m.expect(input.pipe(filterSome((v) => v > 1))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return true if the array contains some truthy string with predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: ['', '', ''],
        b: ['', 'Foo', 'Bar'],
        c: ['Foo', 'Bar', 'Baz'],
      });
      const subs = '^------!';
      const expected = m.cold('---y-z-|', { y: ['', 'Foo', 'Bar'], z: ['Foo', 'Bar', 'Baz'] });
      m.expect(input.pipe(filterSome((v) => v.length < 4))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
