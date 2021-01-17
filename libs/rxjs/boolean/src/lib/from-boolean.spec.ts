import { catchError, filter, map, reduce, tap } from 'rxjs/operators';
import { fromBoolean } from '@rxjs-ninja/rxjs-boolean';
import { observe } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('fromBoolean', () => {
  it(
    'should create an Observable from a single boolean argument',
    observe(() =>
      fromBoolean(false).pipe(
        map((val) => !val),
        tap((value) => expect(value).toBeTruthy()),
      ),
    ),
  );

  it(
    'should create an Observable from a promise',
    observe(() =>
      fromBoolean(Promise.resolve(false)).pipe(
        map((val) => !val),
        tap((value) => expect(value).toBeTruthy()),
      ),
    ),
  );

  it(
    'should create an Error from a failed promise',
    observe(() =>
      fromBoolean(Promise.reject('RxJS Ninja')).pipe(
        map((val) => !val),
        catchError((error) => {
          expect(error).toBe('RxJS Ninja');
          return of(true);
        }),
      ),
    ),
  );

  it(
    'should create an Observable from a Observable',
    observe(() =>
      fromBoolean(of(false)).pipe(
        map((val) => !val),
        tap((value) => expect(value).toBeTruthy()),
      ),
    ),
  );

  it(
    'should create an Observable from multiple boolean arguments',
    observe(() =>
      fromBoolean(false, true, false).pipe(
        map((val) => !val),
        reduce<boolean, boolean[]>((acc, val) => [...acc, val], []),
        tap((value) => expect(value).toStrictEqual([true, false, true])),
      ),
    ),
  );

  it(
    'should create an Observable from an array of boolean values',
    observe(() =>
      fromBoolean([false, true, false, true, false]).pipe(
        filter(Boolean),
        reduce((acc) => acc + 1, 0),
        tap((value) => expect(value).toBe(2)),
      ),
    ),
  );

  it(
    'should create an Observable from a single empty string argument',
    observe(() => fromBoolean('').pipe(tap((value) => expect(value).toBeFalsy()))),
  );

  it(
    'should create an Observable from a single string argument',
    observe(() => fromBoolean('hello').pipe(tap((value) => expect(value).toBeTruthy()))),
  );

  it(
    'should create an Observable from an argument list of strings',
    observe(() =>
      fromBoolean('', 'hello', 'rxjs', 'ninja').pipe(
        reduce<boolean, boolean[]>((acc, val) => [...acc, val], []),
        tap((value) => expect(value).toStrictEqual([false, true, true, true])),
      ),
    ),
  );

  it(
    'should create an Observable from an array of strings',
    observe(() =>
      fromBoolean(['', 'hello', 'rxjs', 'ninja']).pipe(
        reduce<boolean, boolean[]>((acc, val) => [...acc, val], []),
        tap((value) => expect(value).toStrictEqual([false, true, true, true])),
      ),
    ),
  );

  it(
    'should create an Observable from a number value of 0',
    observe(() => fromBoolean(0).pipe(tap((value) => expect(value).toBeFalsy()))),
  );

  it(
    'should create an Observable from positive number value',
    observe(() => fromBoolean(1).pipe(tap((value) => expect(value).toBeTruthy()))),
  );

  it(
    'should create an Observable from an argument list of numbers',
    observe(() =>
      fromBoolean(0, 1, 2, 3).pipe(
        reduce<boolean, boolean[]>((acc, val) => [...acc, val], []),
        tap((value) => expect(value).toStrictEqual([false, true, true, true])),
      ),
    ),
  );

  it(
    'should create an Observable from an array of numbers',
    observe(() =>
      fromBoolean([0, 1, 2, 3]).pipe(
        reduce<boolean, boolean[]>((acc, val) => [...acc, val], []),
        tap((value) => expect(value).toStrictEqual([false, true, true, true])),
      ),
    ),
  );

  it(
    'should create an Observable from an Observable single Observable value',
    observe(() => fromBoolean(of('foobar')).pipe(tap((value) => expect(value).toStrictEqual(true)))),
  );

  it(
    'should create an Observable from an Observable array of numbers',
    observe(() =>
      fromBoolean(of([0, 1, 2, 3])).pipe(
        reduce<boolean, boolean[]>((acc, val) => [...acc, val], []),
        tap((value) => expect(value).toStrictEqual([false, true, true, true])),
      ),
    ),
  );
});
