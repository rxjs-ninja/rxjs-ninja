/**
 * @packageDocumentation
 * @module Array
 */
import { Observable, Subscribable } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';
import { createOrReturnObservable, flatMapSet } from '../utils/internal';

/**
 * Returns an Observable that emits an `Array` from a `Set`
 *
 * @category Set
 *
 * @typeParam T The type of value contained in the `Set`
 *
 * @param input Input to create the emit values from, can be argument list of `Set`, an array of `Set` or an Observable
 *   or Promise source
 *
 * @example
 * Create `Array` from `Set`
 * ```ts
 * const input = new Set(1, 1, 2, 2, 3, 3, 4, 4);
 * fromSet(input).subscribe();
 * ```
 * Output: `[1, 2, 3, 4]`
 *
 * @returns Observable that emits an `Array` from the input `Set`
 */
export function fromSet<T extends unknown>(
  input: Subscribable<Iterable<Set<T>> | Set<T>> | Iterable<Set<T>> | Set<T>,
): Observable<T[]> {
  return new Observable<T[]>((subscriber) => {
    createOrReturnObservable(input)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map<Iterable<Set<T>> | Set<T>, T[][]>((value) => flatMapSet(value)),
        tap((value) => {
          for (let i = 0; i < value.length; i++) {
            subscriber.next(value[i] as T[]);
          }
        }),
        finalize(() => !subscriber.closed && subscriber.complete()),
      )
      .subscribe();

    /* istanbul ignore next-line */
    return () => !subscriber.closed && subscriber.complete();
  });
}
