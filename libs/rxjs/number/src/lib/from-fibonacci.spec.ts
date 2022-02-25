import { of } from 'rxjs';
import { observe } from 'rxjs-marbles/jest';
import { catchError, finalize, reduce, take, tap } from 'rxjs/operators';
import { fromFibonacci } from './from-fibonacci';

describe('fromFibonacci', () => {
  it(
    'should emit the fibonacci sequence number up to 6 iterations',
    observe(() =>
      fromFibonacci(6).pipe(
        reduce((acc, val) => [...acc, val], [] as number[]),
        tap((value) => expect(value).toStrictEqual([0, 1, 1, 2, 3, 5])),
      ),
    ),
  );

  it(
    'should emit the fibonacci sequence number up to 6 iterations with delay of 100ms',
    observe(() => {
      const start = Date.now();
      return fromFibonacci(6, 100).pipe(
        reduce((acc, val) => [...acc, val], [] as number[]),
        finalize(() => expect(Date.now() - start).toBeCloseTo(600, -2)),
      );
    }),
  );

  it(
    'should emit an error if 0 is passed as an iteration value',
    observe(() =>
      fromFibonacci(0).pipe(
        catchError((error) => {
          expect(error).toBe('fromFibonacci must be passed a positive integer value');
          return of(undefined);
        }),
      ),
    ),
  );

  it(
    'should emit an error if negative value is passed as an iteration value',
    observe(() =>
      fromFibonacci(-50).pipe(
        catchError((error) => {
          expect(error).toBe('fromFibonacci must be passed a positive integer value');
          return of(undefined);
        }),
      ),
    ),
  );

  it(
    'should end early if subscription is cancelled',
    observe(() => {
      let result: number[] = [];
      return fromFibonacci(6).pipe(
        take(3),
        reduce((acc, val) => [...acc, val], [] as number[]),
        tap((value) => (result = value)),
        finalize(() => expect(result).toStrictEqual([0, 1, 1])),
      );
    }),
  );
});
