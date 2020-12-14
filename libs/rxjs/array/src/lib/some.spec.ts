import { marbles } from 'rxjs-marbles';
import { every, some } from '@rxjs-ninja/rxjs-array';

describe('some', () => {
  it(
    'should return true if the array contains truthy values',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: [false, false, true],
        b: [true, false, false],
        c: [false, false, false],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: true, y: true, z: false });
      m.expect(input.pipe(some())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return true if the array contains values that pass the predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: ['RxJS', 'Ninja'],
        b: ['RxJS', 'Rocks'],
        c: ['Fizz', 'Buzz'],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: true, y: true, z: false });
      m.expect(input.pipe(some((v) => v === 'RxJS'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return true if the array contains at least one truthy strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: ['', '', ''],
        b: ['', 'Hello', 'RxJS'],
        c: ['Hello', 'RxJS', 'Ninja'],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: false, y: true, z: true });
      m.expect(input.pipe(some())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return true if the array contains at least one truthy strings with predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: ['', '', ''],
        b: ['', 'Foo', 'Bar'],
        c: ['Foo', 'Bar', 'Baz'],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: false, y: true, z: true });
      m.expect(input.pipe(some((v) => v.length < 4))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
