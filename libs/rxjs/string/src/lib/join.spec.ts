import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { join } from './join';

describe('join', () => {
  it(
    'should join an array of strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['RxJS', 'Ninja'], b: ['RxJS', 'Is', 'Awesome'], c: [] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'RxJS Ninja', y: 'RxJS Is Awesome', z: '' });
      m.expect(input.pipe(join())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should join an array of strings with Observable separator',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['Slow', 'Fast'], b: ['Step 1', 'Step 2', 'Step 3'], c: [] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'Slow > Fast', y: 'Step 1 > Step 2 > Step 3', z: '' });
      m.expect(input.pipe(join(of(' > ')))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should join an array of numbers with comma separator',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [1, 2, 3], b: [10, 20, 30], c: [100, 1000, 100000] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: '1,2,3', y: '10,20,30', z: '100,1000,100000' });
      m.expect(input.pipe(join(','))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
