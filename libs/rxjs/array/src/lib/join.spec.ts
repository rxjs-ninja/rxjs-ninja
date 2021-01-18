import { marbles } from 'rxjs-marbles';
import { join } from '@rxjs-ninja/rxjs-array';
import { of } from 'rxjs';

describe('join', () => {
  it(
    'should return a joined string from an array of string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['RxJS', 'Ninja'], b: ['RxJS', 'Rocks'], c: ['Fizz', 'Buzz'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'RxJS Ninja', y: 'RxJS Rocks', z: 'Fizz Buzz' });
      m.expect(input.pipe(join())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a joined string from an array of strings with passed separator',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['RxJS', 'Ninja'], b: ['RxJS', 'Rocks'], c: ['Fizz', 'Buzz'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'RxJS-Ninja', y: 'RxJS-Rocks', z: 'Fizz-Buzz' });
      m.expect(input.pipe(join('-'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a joined string from an array of strings with passed Observable separator',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['RxJS', 'Ninja'], b: ['RxJS', 'Rocks'], c: ['Fizz', 'Buzz'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'RxJS-Ninja', y: 'RxJS-Rocks', z: 'Fizz-Buzz' });
      m.expect(input.pipe(join(of('-')))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
