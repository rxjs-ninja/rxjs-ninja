/**
 * @packageDocumentation
 * @module Number
 */
import { isObservable, Observable, ObservableInput, throwError } from 'rxjs';
import { fromPromise, isPromise } from 'rxjs/internal-compatibility';
import { catchError, finalize, map, takeWhile, tap } from 'rxjs/operators';
import { isArrayOrSet } from '../utils/array-set';
import { ArrayOrSetNumbers } from '../types/array-set';

/**
 * Returns an Observable that emits numbers from an an arguments list or array of number values
 *
 * @category Create
 *
 * @remarks This is a type-safe version of the RxJS {@link https://rxjs.dev/api/index/function/from|from} operator that
 *   only accepts numbers as input
 *
 * @param args Numbers to emit from the Observable as arguments or an array
 *
 * @example
 * Returns an observable from a single number and multiply the value
 * ```ts
 * fromNumber(6).pipe(map(val => val * 7)).subscribe();
 * ```
 * Output: `42`
 *
 * @example
 * Returns an Observable from an argument list of numbers and reduce the values
 * ```ts
 * fromNumber(1, 2, 3, 4).pipe(reduce((acc, val) => acc + val)).subscribe();
 * ```
 * Output: `10`
 *
 * @example
 * Returns an Observable from an array of numbers and reduce the values
 * ```ts
 * const input = [1, 2, 3, 4];
 * fromNumber(input).pipe(reduce((acc, val) => acc + val)).subscribe();
 * ```
 * Output: `10`
 *
 * @returns Observable that emits numbers passed from arguments or array
 */

export function fromNumber(
  ...args: (ObservableInput<ArrayOrSetNumbers | number> | ArrayOrSetNumbers | number)[]
): Observable<number> {
  return new Observable<number>((subscriber) => {
    if (isObservable(args[0])) {
      (args[0] as Observable<ArrayOrSetNumbers | number>)
        .pipe(
          takeWhile(() => !subscriber.closed),
          map((value) => (isArrayOrSet(value) ? [...value] : [value])),
          tap((value) => {
            for (let i = 0; i < value.length; i++) {
              subscriber.next(value[i]);
            }
            !subscriber.closed && subscriber.complete();
          }),
        )
        .subscribe();
    } else if (isPromise(args[0])) {
      fromPromise(args[0] as Promise<ArrayOrSetNumbers | number>)
        .pipe(
          map<ArrayOrSetNumbers | number, number[]>((value) =>
            Array.isArray(value) ? (value as number[]) : ([value] as number[]),
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
      const value = Array.isArray(args[0]) ? (args[0] as number[]) : ([...args] as number[]);
      for (let i = 0; i < value.length; i++) {
        subscriber.next(value[i]);
      }
      !subscriber.closed && subscriber.complete();
    }
    /* istanbul ignore next-line */
    return () => !subscriber.closed && subscriber.complete();
  });
}
