import { catchError, reduce, tap } from 'rxjs/operators';
import { observe } from 'rxjs-marbles/jest';
import { fromMap } from '@rxjs-ninja/rxjs-array';
import { of } from 'rxjs';

describe('fromMap', () => {
  it(
    'should create an Observable from a single Map argument',
    observe(() =>
      fromMap(
        new Map([
          [1, 'a'],
          [2, 'b'],
          [3, 'c'],
        ]),
      ).pipe(
        tap((value) =>
          expect(value).toStrictEqual([
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
          ]),
        ),
      ),
    ),
  );

  it(
    'should create an Observable from a single Observable Map argument',
    observe(() =>
      fromMap(
        of(
          new Map([
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
          ]),
        ),
      ).pipe(
        tap((value) =>
          expect(value).toStrictEqual([
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
          ]),
        ),
      ),
    ),
  );

  it(
    'should create an Observable from multiple Map arguments',
    observe(() => {
      return fromMap(
        new Map([
          [1, 'a'],
          [2, 'b'],
          [3, 'c'],
        ]),
        new Map([
          [4, 'd'],
          [5, 'e'],
          [6, 'f'],
        ]),
      ).pipe(
        reduce((a, b) => [...a, ...b], [] as [number, string][]),
        tap((value) =>
          expect(value).toStrictEqual([
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
            [4, 'd'],
            [5, 'e'],
            [6, 'f'],
          ]),
        ),
      );
    }),
  );

  it(
    'should create an Observable from array of Map arguments',
    observe(() => {
      return fromMap([
        new Map([
          [1, 'a'],
          [2, 'b'],
          [3, 'c'],
        ]),
        new Map([
          [4, 'd'],
          [5, 'e'],
          [6, 'f'],
        ]),
      ]).pipe(
        reduce((a, b) => [...a, ...b], [] as [number, string][]),
        tap((value) =>
          expect(value).toStrictEqual([
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
            [4, 'd'],
            [5, 'e'],
            [6, 'f'],
          ]),
        ),
      );
    }),
  );

  it(
    'should create an Observable from Observable array of Map arguments',
    observe(() => {
      return fromMap(
        of([
          new Map([
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
          ]),
          new Map([
            [4, 'd'],
            [5, 'e'],
            [6, 'f'],
          ]),
        ]),
      ).pipe(
        reduce((a, b) => [...a, ...b], [] as [number, string][]),
        tap((value) =>
          expect(value).toStrictEqual([
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
            [4, 'd'],
            [5, 'e'],
            [6, 'f'],
          ]),
        ),
      );
    }),
  );

  it(
    'should create an Observable from a Promise single Map argument',
    observe(() =>
      fromMap(
        Promise.resolve(
          new Map([
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
          ]),
        ),
      ).pipe(
        tap((value) =>
          expect(value).toStrictEqual([
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
          ]),
        ),
      ),
    ),
  );

  it(
    'should create an Error from a failed promise',
    observe(() =>
      fromMap(Promise.reject('RxJS Ninja')).pipe(
        catchError((error) => {
          expect(error).toBe('RxJS Ninja');
          return of(true);
        }),
      ),
    ),
  );
});
