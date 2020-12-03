import { fromFibonacci } from '@rxjs-ninja/rxjs-number';
import { observe } from 'rxjs-marbles/jest';
import { finalize, reduce, tap } from 'rxjs/operators';

describe('fromFibonacci', () => {
  it(
    'should create observable fibonacci sequence number up to the max number of iterations',
    observe(() =>
      fromFibonacci(6).pipe(
        reduce((acc, val) => [...acc, val], [] as number[]),
        tap((value) => expect(value).toStrictEqual([0, 1, 1, 2, 3, 5])),
      ),
    ),
  );

  it(
    'should create observable fibonacci sequence number up to the max number of iterations with delay',
    observe(() => {
      const start = Date.now();
      return fromFibonacci(6, 100).pipe(
        reduce((acc, val) => [...acc, val], [] as number[]),
        finalize(() => expect(Date.now() - start).toBeCloseTo(600, -2)),
      );
    }),
  );
});
