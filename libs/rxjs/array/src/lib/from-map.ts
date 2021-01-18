/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, Observable, ObservableInput, Subscriber } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { isPromise } from 'rxjs/internal-compatibility';
import { ArrayOrSet } from '../types/array-set';

/**
 * Returns an Observable that emits an `Array` from a `Map`, it does not flatten or emit the
 * values from the `Map`, but coverts to `Array`
 *
 * @category Map
 *
 * @typeParam K The type of value in the `Map` key
 * @typeParam V Type of the value in the `Map` value
 *
 * @param args Input values to create the Observable source from
 *
 * @example
 * Create `Array` from `Set`
 * ```ts
 * const input = new Map([ [1, 'a'], [2, 'b'], [3, 'c'] ]);
 * fromMap(input).subscribe();
 * ```
 * Output: `[1, 'a'], [2, 'b'], [3, 'c']`
 *
 * @returns Observable that emits an `Array` from the input `Map`
 */
export function fromMap<V extends unknown, K extends unknown>(
  ...args: (ObservableInput<ArrayOrSet<Map<K, V>> | Map<K, V>> | Map<K, V>[] | Map<K, V>)[]
): Observable<[K, V][]> {
  if (isObservable(args[0])) {
    return ((args[0] as unknown) as Observable<Map<K, V>[] | Map<K, V>>).pipe(
      map<Map<K, V>[] | Map<K, V>, [K, V][]>((value) =>
        Array.isArray(value) ? ([...([...value] as [K, V])] as [K, V][]) : ([[...value] as [K, V]] as [K, V][]),
      ),
      switchMap((value) => {
        return new Observable<[K, V][]>((subscriber: Subscriber<[K, V][]>): void => {
          for (let i = 0; i < value.length; i++) {
            subscriber.next(value[i] as [K, V][]);
          }
          subscriber.complete();
        });
      }),
    );
  } else if (isPromise(args[0])) {
    return new Observable<[K, V][]>((subscriber: Subscriber<[K, V][]>): void => {
      ((args[0] as unknown) as Promise<Map<K, V>>).then(
        (response) => {
          /* istanbul ignore next-line */
          if (!subscriber.closed) {
            subscriber.next([...response]);
            subscriber.complete();
          }
        },
        (err) => subscriber.error(err),
      );
    });
  } else {
    const value = Array.isArray(args[0]) ? (args[0] as Map<K, V>[]) : ([...args] as Map<K, V>[]);
    return new Observable<[K, V][]>((subscriber: Subscriber<[K, V][]>): void => {
      for (let i = 0; i < value.length; i++) {
        subscriber.next([...value[i]]);
      }
      subscriber.complete();
    });
  }
}
