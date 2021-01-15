/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

/**
 * Returns an Observable Array containing filtered values that are not in the provided input Array or Set
 *
 * @category Filter
 *
 * @see [[difference]] operator for an Array of unique differences
 *
 * @typeParam T Item type contained in the Array/Set
 *
 * @param input Array/Set or Observable value to compare against for the difference
 *
 * @example
 * Returns the difference between the source array and the passed static array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(filterDifference(['a', 'c'])).subscribe();
 * ```
 * Output: `'b', 'd', 'b'`
 *
 * @example
 * Returns the difference between the source array and the passed Observable array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(filterDifference(of(['a', 'c']))).subscribe();
 * ```
 * Output: `'b', 'd', 'b'`
 *
 * @returns An Observable that emits an Array with the difference between source and input
 */
export function filterDifference<T extends unknown>(
  input: T[] | Set<T> | ObservableInput<T[] | Set<T>>,
): OperatorFunction<T[] | Set<T>, T[]> {
  return (source) =>
    ((isObservable(input) ? input : of(input)) as Observable<T[] | Set<T>>).pipe(
      map((value) => new Set(value)),
      switchMap((inputValue) => {
        return source.pipe(
          map((value) => [...value]),
          map((value) => value.filter((v) => !inputValue.has(v))),
        );
      }),
    );
}
