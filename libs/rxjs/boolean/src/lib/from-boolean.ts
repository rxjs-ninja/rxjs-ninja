/**
 * @packageDocumentation
 * @module Boolean
 */
import { isObservable, Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, finalize, map, takeWhile, tap } from 'rxjs/operators';
import { fromPromise, isPromise } from 'rxjs/internal-compatibility';
import { ArrayOrSet } from '../types/array-set';
import { isArrayOrSet } from '../utils/array-set';

/**
 * Returns an Observable that emits boolean values from passed source of values.
 *
 * @category Create
 *
 * @typeParam T Type of the value from the source Observable
 * @typeParam A Input types accepted to convert to boolean
 *
 * @param args Input values to create the Observable source from
 *
 * @example
 * Create an Observable that emits a single boolean value from a string, flip the value
 * ```ts
 * fromBoolean('Hello RxJS Ninja').pipe(flip()).subscribe();
 * ```
 * Output: `false`
 *
 * @example
 * Create an Observable that emits a single boolean from an array of values
 * ```ts
 * fromBoolean(['', 'Hello', 'RxJS', '']).subscribe();
 * ```
 * Output: `false, true, true, false`;
 *
 * @returns Observable that emits boolean values of the source value

 */
export function fromBoolean<T extends unknown, A extends ObservableInput<ArrayOrSet<T> | T> | ArrayOrSet<T> | T>(
  ...args: A[]
): Observable<boolean> {
  return new Observable<boolean>((subscriber) => {
    if (isObservable(args[0])) {
      (args[0] as Observable<ArrayOrSet<T> | T>)
        .pipe(
          takeWhile(() => !subscriber.closed),
          map((value) => (isArrayOrSet(value) ? [...value] : [value]).map(Boolean)),
          tap((value) => {
            for (let i = 0; i < value.length; i++) {
              subscriber.next(value[i]);
            }
            !subscriber.closed && subscriber.complete();
          }),
        )
        .subscribe();
    } else if (isPromise(args[0])) {
      fromPromise(args[0] as Promise<ArrayOrSet<T> | T>)
        .pipe(
          map<ArrayOrSet<T> | T, boolean[]>((value) =>
            (Array.isArray(value) ? (value as T[]) : ([value] as T[])).map(Boolean),
          ),
          tap((value) => {
            for (let i = 0; i < value.length; i++) {
              subscriber.next(value[i]);
            }
          }),
          catchError((error) => {
            subscriber.error(error);
            return throwError(error);
          }),
          finalize(() => !subscriber.closed && subscriber.complete()),
        )
        .subscribe();
    } else {
      const value = (Array.isArray(args[0]) ? (args[0] as T[]) : ([...args] as T[])).map(Boolean);
      for (let i = 0; i < value.length; i++) {
        subscriber.next(value[i]);
      }
      !subscriber.closed && subscriber.complete();
    }
    /* istanbul ignore next-line */
    return () => !subscriber.closed && subscriber.complete();
  });
}
