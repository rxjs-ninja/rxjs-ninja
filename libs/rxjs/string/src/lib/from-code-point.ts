/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, finalize, map, takeWhile, tap } from 'rxjs/operators';
import { fromPromise, isPromise } from 'rxjs/internal-compatibility';
import { ArrayOrSet } from '../types/array-set';
import { isArrayOrSet } from '../utils/array-set';

/**
 * Returns an Observable that emits a string made from code points using String.fromCodePoint
 *
 * @remarks This operator will emit a single string for all input passed including arrays
 *
 * @category Create
 *
 * @param args Observable input, Promise, Array or argument list of code points
 *
 * @example
 * Return a string from code points arguments
 * ```ts
 * fromCodePoint(9731, 9733, 9842).subscribe();
 * ```
 * Output: `☃★♲`
 *
 * @example
 * Return a string from code points array
 * ```ts
 * fromCodePoint([9731, 9733, 9842]).subscribe();
 * ```
 * Output: `☃★♲`
 *
 * @example
 * Return a string from code points Observable
 * ```ts
 * fromCodePoint(of([9731, 9733, 9842]).subscribe();
 * ```
 * Output: `☃★♲`
 *
 * @returns Observable that emits a string
 */
export function fromCodePoint(
  ...args: (ObservableInput<ArrayOrSet<number> | number> | ArrayOrSet<number> | number)[]
): Observable<string> {
  return new Observable<string>((subscriber) => {
    if (isObservable(args[0])) {
      (args[0] as Observable<ArrayOrSet<number> | number>)
        .pipe(
          takeWhile(() => !subscriber.closed),
          map((value) => (isArrayOrSet(value) ? [...value] : [value])),
          tap((value) => {
            subscriber.next(String.fromCodePoint(...value));
          }),
          finalize(() => !subscriber.closed && subscriber.complete()),
        )
        .subscribe();
    } else if (isPromise(args[0])) {
      fromPromise(args[0] as Promise<ArrayOrSet<number> | number>)
        .pipe(
          map((value) => (isArrayOrSet(value) ? [...value] : [value])),
          tap((value) => subscriber.next(String.fromCodePoint(...value))),
          catchError((error) => {
            subscriber.error(error);
            return throwError(error);
          }),
          finalize(() => !subscriber.closed && subscriber.complete()),
        )
        .subscribe();
    } else {
      const value = isArrayOrSet(args[0]) ? [...(args[0] as number[])] : ([...args] as number[]);
      subscriber.next(String.fromCodePoint(...value));
      !subscriber.closed && subscriber.complete();
    }
    /* istanbul ignore next-line */
    return () => !subscriber.closed && subscriber.complete();
  });
}
