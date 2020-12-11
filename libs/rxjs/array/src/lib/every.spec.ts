import { marbles } from 'rxjs-marbles';
import { every } from '@rxjs-ninja/rxjs-array';

describe('every', () => {
  it(
    'should return true if the array contains all truthy values',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: [false, false, false],
        b: [false, true, false],
        c: [true, true, true],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: false, y: false, z: true });
      m.expect(input.pipe(every())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return true if the array contains values that pass the predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: [1, 0, 1, 0, 1, 0],
        b: [1, 0, 2, 1, 0, 2],
        c: [0, 1, 0, 1, 0, 2],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: true, y: false, z: false });
      m.expect(input.pipe(every((v) => v < 2))).toBeObservable(expected);
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
      const expected = m.cold('-x-y-z-|', { x: false, y: false, z: true });
      m.expect(input.pipe(every())).toBeObservable(expected);
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
      const expected = m.cold('-x-y-z-|', { x: false, y: false, z: true });
      m.expect(input.pipe(every((v) => v.length < 4))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
