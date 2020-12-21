import { marbles } from 'rxjs-marbles';
import { find } from '@rxjs-ninja/rxjs-array';

describe('find', () => {
  it(
    'should return the first truthy string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: ['', '', ''],
        b: ['', '', 'Hello', 'RxJS', 'Ninja'],
        c: ['Hello', 'RxJS', 'Ninja'],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: undefined, y: 'Hello', z: 'Hello' });
      m.expect(input.pipe(find())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the first truthy string of length < 5',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: ['', '', ''],
        b: ['', '', 'Hello', 'RxJS', 'Ninja'],
        c: ['Hello', 'RxJS', 'Ninja'],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: undefined, y: 'RxJS', z: 'RxJS' });
      m.expect(input.pipe(find((v) => v.length < 5))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the first item from the array that is Boolean truthy',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0, 0, 0, 0, 1, 0], b: [0, 0, 0, 0], c: [99, 0, 0] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 1, y: undefined, z: 99 });
      m.expect(input.pipe(find())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the first item from the array that is found via the predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: [1, 2, 3, 4, 5, 6],
        b: [1, 5, 4, 2],
        c: [0, 5, 11, 13, 87],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 6, y: undefined, z: 11 });
      m.expect(input.pipe(find((v) => v > 5))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
