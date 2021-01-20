/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

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
  input: Subscribable<Iterable<T>> | Iterable<T>,
): OperatorFunction<Iterable<T>, T[]> {
  const $input = createOrReturnObservable(input);
  return (source) =>
    source.pipe(
      withLatestFrom($input),
      map<[Iterable<T>, Iterable<T>], [T[], Set<T>]>(([value, inputValue]) => [[...value], new Set(inputValue)]),
      map(([value, inputValue]) => value.filter((x) => !inputValue.has(x))),
    );
}
