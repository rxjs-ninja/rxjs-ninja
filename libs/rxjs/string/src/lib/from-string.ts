/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, throwError } from 'rxjs';
import { fromPromise, isPromise } from 'rxjs/internal-compatibility';
import { catchError, finalize, map, takeWhile, tap } from 'rxjs/operators';
import { isArrayOrSet } from '../utils/array-set';
import { ArrayOrSet } from '../types/array-set';

/**
 * Returns an Observable that emits strings from any an argument list of strings or  supported Observable, Promise or
 * Array-like source
 *
 * @category Create
 *
 * @remarks This operator is a type-safe {@link https://rxjs.dev/api/index/function/from|from} and will emit only
 * strings, also unlike `from` a single string is not converted into an array-like.
 *
 * @param args Argument list, Observable input, Promise or Array of strings
 *
 * @example
 * Return a reversed string from an argument list of strings
 * ```ts
 * fromString('RxJS', 'Ninja').pipe(reverse()).subscribe();
 * ```
 * Output: `'SJxR', 'ajniN'`
 *
 * @example
 * Return a reversed string from an array list of strings
 * ```ts
 * fromString(['RxJS', 'Ninja']).pipe(reverse()).subscribe();
 * ```
 * Output: `'SJxR', 'ajniN'`
 *
 * @example
 * Return a reversed string from an Observable array list of strings
 * ```ts
 * fromString(of(['RxJS', 'Ninja'])).pipe(reverse()).subscribe();
 * ```
 * Output: `'SJxR', 'ajniN'`
 *
 * @returns Observable that emits a string
 */
export function fromString(
  ...args: (ObservableInput<ArrayOrSet<string> | string> | ArrayOrSet<string> | string)[]
): Observable<string> {
  return new Observable<string>((subscriber) => {
    if (isObservable(args[0])) {
      (args[0] as Observable<ArrayOrSet<string> | string>)
        .pipe(
          takeWhile(() => !subscriber.closed),
          map((value) => (isArrayOrSet(value) ? [...value] : [value])),
          tap((value) => {
            for (let i = 0; i < value.length; i++) {
              subscriber.next(value[i]);
            }
          }),
          finalize(() => !subscriber.closed && subscriber.complete()),
        )
        .subscribe();
    } else if (isPromise(args[0])) {
      fromPromise(args[0] as Promise<ArrayOrSet<string> | string>)
        .pipe(
          map<ArrayOrSet<string> | string, string[]>((value) =>
            Array.isArray(value) ? (value as string[]) : ([value] as string[]),
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
      const value = Array.isArray(args[0]) ? (args[0] as string[]) : ([...args] as string[]);
      for (let i = 0; i < value.length; i++) {
        subscriber.next(value[i]);
      }
      !subscriber.closed && subscriber.complete();
    }
    /* istanbul ignore next-line */
    return () => !subscriber.closed && subscriber.complete();
  });
}
