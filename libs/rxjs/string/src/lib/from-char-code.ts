/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, finalize, map, takeWhile, tap } from 'rxjs/operators';
import { fromPromise, isPromise } from 'rxjs/internal-compatibility';
import { isArrayOrSet } from '../utils/array-set';
import { ArrayOrSet } from '../types/array-set';

/**
 * Returns an Observable that emits a string made from character codes using String.fromCharCode
 *
 * @remarks This operator will emit a single string for all input passed including arrays
 *
 * @see The [[mapCharCode]] operator can be used to map an Observable source of char codes to strings
 *
 * @category Create
 *
 * @param args Observable input, Promise, Array or argument list of character codes
 *
 * @example
 * Return a string from character code arguments
 * ```ts
 * fromCharCode(82, 120, 74, 83).subscribe();
 * ```
 * Output: `RxJS`
 *
 * @example
 * Return a string from character code array
 * ```ts
 * fromCharCode([82, 120, 74, 83]).subscribe();
 * ```
 * Output: `RxJS`
 *
 * @example
 * Return a string from character code Observable
 * ```ts
 * fromCharCode(of([82, 120, 74, 83]).subscribe();
 * ```
 * Output: `RxJS`
 *
 * @returns Observable that emits a string
 */
export function fromCharCode(
  ...args: (ObservableInput<ArrayOrSet<number> | number> | ArrayOrSet<number> | number)[]
): Observable<string> {
  return new Observable<string>((subscriber) => {
    if (isObservable(args[0])) {
      (args[0] as Observable<ArrayOrSet<number> | number>)
        .pipe(
          takeWhile(() => !subscriber.closed),
          map((value) => (isArrayOrSet(value) ? [...value] : [value])),
          tap((value) => {
            subscriber.next(String.fromCharCode(...value));
          }),
          finalize(() => !subscriber.closed && subscriber.complete()),
        )
        .subscribe();
    } else if (isPromise(args[0])) {
      fromPromise(args[0] as Promise<ArrayOrSet<number> | number>)
        .pipe(
          map((value) => (isArrayOrSet(value) ? [...value] : [value])),
          tap((value) => subscriber.next(String.fromCharCode(...value))),
          catchError((error) => {
            subscriber.error(error);
            return throwError(error);
          }),
          finalize(() => !subscriber.closed && subscriber.complete()),
        )
        .subscribe();
    } else {
      const value = isArrayOrSet(args[0]) ? [...(args[0] as number[])] : ([...args] as number[]);
      subscriber.next(String.fromCharCode(...value));
      !subscriber.closed && subscriber.complete();
    }
    /* istanbul ignore next-line */
    return () => !subscriber.closed && subscriber.complete();
  });
}
