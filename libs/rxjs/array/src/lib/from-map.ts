/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, finalize, map, takeWhile, tap } from 'rxjs/operators';
import { fromPromise, isPromise } from 'rxjs/internal-compatibility';
import { flatMapMap } from '../utils/array-set';

/**
 * Returns an Observable that emits an `Array` from a `Map`
 *
 * @category Map
 *
 * @typeParam K The type of value in the `Map` key
 * @typeParam V Type of the value in the `Map` value
 *
 * @param args Input to create the emit values from, can be argument list of `Map`, an array of `Map` or an Observable
 *   or Promise source
 *
 * @example
 * Create `Array` from `Map`
 * ```ts
 * const input = new Map([ [1, 'a'], [2, 'b'], [3, 'c'] ]);
 * fromMap(input).subscribe();
 * ```
 * Output: `[1, 'a'], [2, 'b'], [3, 'c']`
 *
 * @returns Observable that emits an `Array` from the input `Map`
 */
export function fromMap<K extends unknown, V extends unknown>(
  ...args: (ObservableInput<Map<K, V>[] | Map<K, V>> | Map<K, V>[] | Map<K, V>)[]
): Observable<[K, V][]> {
  return new Observable<[K, V][]>((subscriber) => {
    if (isObservable(args[0])) {
      (args[0] as Observable<Map<K, V>[] | Map<K, V>>)
        .pipe(
          takeWhile(() => !subscriber.closed),
          map<Map<K, V>[] | Map<K, V>, [K, V][]>((value) => flatMapMap(value)),
          tap((value) => {
            for (let i = 0; i < value.length; i++) {
              subscriber.next(value[i] as [K, V][]);
            }
            !subscriber.closed && subscriber.complete();
          }),
        )
        .subscribe();
    } else if (isPromise(args[0])) {
      fromPromise(args[0] as Promise<Map<K, V>[] | Map<K, V>>)
        .pipe(
          map<Map<K, V>[] | Map<K, V>, [K, V][]>((value) => flatMapMap(value)),
          tap((value) => {
            for (let i = 0; i < value.length; i++) {
              subscriber.next(value[i] as [K, V][]);
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
      const value = Array.isArray(args[0]) ? flatMapMap(args[0]) : flatMapMap([...(args as Map<K, V>[])]);
      for (let i = 0; i < value.length; i++) {
        subscriber.next(value[i] as [K, V][]);
      }
      !subscriber.closed && subscriber.complete();
    }
    /* istanbul ignore next-line */
    return () => !subscriber.closed && subscriber.complete();
  });
}
