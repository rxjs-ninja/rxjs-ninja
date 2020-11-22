import { fromFibonacci } from '@rxjs-ninja/rxjs-number';
import { observe } from 'rxjs-marbles/jest';
import { reduce, tap } from 'rxjs/operators';

describe('fromFibonacci', () => {
  it(
    'should create observable fibonacci sequence number up to the max number of iterations',
    observe(() =>
      fromFibonacci(6, 0).pipe(
        reduce((acc, val) => [...acc, val], [] as number[]),
        tap((value) => expect(value).toStrictEqual([0, 1, 1, 2, 3, 5])),
      ),
    ),
  );
});
