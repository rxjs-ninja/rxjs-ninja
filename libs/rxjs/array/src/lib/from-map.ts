/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, Observable, ObservableInput, Subscribable, throwError } from 'rxjs';
import { catchError, finalize, map, takeWhile, tap } from 'rxjs/operators';
import { fromPromise, isPromise } from 'rxjs/internal-compatibility';
import { flatMapMap } from '../utils/array-set';
import { createOrReturnObservable } from 'libs/rxjs/string/src/utils/internal';

/**
 * Returns an Observable that emits an `Array` from a `Map`
 *
 * @category Map
 *
 * @typeParam K The type of value in the `Map` key
 * @typeParam V Type of the value in the `Map` value
 *
 * @param input Input to create the emit values from, can be argument list of `Map`, an array of `Map` or an Observable
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
  input: Subscribable<Iterable<Map<K, V>> | Map<K, V>> | Iterable<Map<K, V>> | Map<K, V>,
): Observable<[K, V][]> {
  return new Observable<[K, V][]>((subscriber) => {
    createOrReturnObservable(input)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map<Iterable<Map<K, V>> | Map<K, V>, [K, V][]>((value) => flatMapMap(value)),
        tap((value) => {
          for (let i = 0; i < value.length; i++) {
            subscriber.next(value[i] as [K, V][]);
          }
        }),
        finalize(() => !subscriber.closed && subscriber.complete()),
      )
      .subscribe();

    /* istanbul ignore next-line */
    return () => !subscriber.closed && subscriber.complete();
  });
}
