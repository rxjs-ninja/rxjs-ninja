import { lastTruthy } from './last-truthy';
import { marbles } from 'rxjs-marbles/jest';

describe('lastTruthy', () => {
  it(
    'should filter the last truthy item',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 1, b: 2, c: 3, d: 4, e: 0 });
      const expected = m.cold('-----------(d|)', { d: 4 });
      m.expect(input.pipe(lastTruthy())).toBeObservable(expected);
    }),
  );

  it(
    'should filter the last truthy item with predicate',
    marbles((m) => {
      const predicate = (num: number) => num % 2 === 0;
      const input = m.hot('-a-b-c-d-e-|', { a: 1, b: 2, c: 3, d: 4, e: 5 });
      const expected = m.cold('-----------(d|)', { d: 4 });
      m.expect(input.pipe(lastTruthy(predicate))).toBeObservable(expected);
    }),
  );
});
