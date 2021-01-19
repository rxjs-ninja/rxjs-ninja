import { split } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('split', () => {
  it(
    'should split a string into an array using default space',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Hello RxJS Ninja' });
      const subs = '^--!';
      const expected = m.cold('-a-|', { a: ['Hello', 'RxJS', 'Ninja'] });
      m.expect(input.pipe(split())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should split a string into an array at the separator',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Name,Age,Street' });
      const subs = '^--!';
      const expected = m.cold('-a-|', { a: ['Name', 'Age', 'Street'] });
      m.expect(input.pipe(split(','))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should split a string into an array at the separator with limit',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Name,Age,Street' });
      const subs = '^--!';
      const expected = m.cold('-a-|', { a: ['Name', 'Age'] });
      m.expect(input.pipe(split(',', 2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should split a string into an array at the Observable separator',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Name,Age,Street' });
      const subs = '^--!';
      const expected = m.cold('-a-|', { a: ['Name', 'Age', 'Street'] });
      m.expect(input.pipe(split(of(',')))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should split a string into an array at the Observable separator with Observable limit',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Name,Age,Street' });
      const subs = '^--!';
      const expected = m.cold('-a-|', { a: ['Name', 'Age'] });
      m.expect(input.pipe(split(of(','), of(2)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
