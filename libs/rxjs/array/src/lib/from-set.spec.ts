import { of } from 'rxjs';
import { observe } from 'rxjs-marbles/jest';
import { reduce, tap } from 'rxjs/operators';
import { fromSet } from './from-set';

describe('fromSet', () => {
  it(
    'should create an Observable from a single Set argument',
    observe(() =>
      fromSet(new Set([1, 1, 2, 3, 3, 4, 4, 5, 5])).pipe(tap((value) => expect(value).toStrictEqual([1, 2, 3, 4, 5]))),
    ),
  );

  it(
    'should create an Observable from a single Observable Set argument',
    observe(() =>
      fromSet(of(new Set([1, 1, 2, 3, 3, 4, 4, 5, 5]))).pipe(
        tap((value) => expect(value).toStrictEqual([1, 2, 3, 4, 5])),
      ),
    ),
  );

  it(
    'should create an Observable from array of Set arguments',
    observe(() =>
      fromSet([new Set([1, 1, 2, 3, 3, 4, 4, 5, 5]), new Set([5, 4, 3, 2, 1])]).pipe(
        reduce((a, b) => [...a, ...b], [] as number[]),
        tap((value) => expect(value).toStrictEqual([1, 2, 3, 4, 5, 5, 4, 3, 2, 1])),
      ),
    ),
  );

  it(
    'should create an Observable from Observable array of Set arguments',
    observe(() =>
      fromSet(of([new Set([1, 1, 2, 3, 3, 4, 4, 5, 5]), new Set([5, 4, 3, 2, 1])])).pipe(
        reduce((a, b) => [...a, ...b], [] as number[]),
        tap((value) => expect(value).toStrictEqual([1, 2, 3, 4, 5, 5, 4, 3, 2, 1])),
      ),
    ),
  );
});
