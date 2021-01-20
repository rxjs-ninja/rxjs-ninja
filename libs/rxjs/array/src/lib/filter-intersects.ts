/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable Array containing filtered values that are in both the source in the provided input Array or Set
 *
 * @category Filter
 *
 * @see [[intersects]] operator for an Array of unique intersection items
 *
 * @typeParam T Item type contained in the Array/Set
 *
 * @param input Array/Set or Observable value to compare against for the intersection
 *
 * @example
 * Returns the intersection between the source array and the passed static array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(filterIntersects(['a', 'd'])).subscribe();
 * ```
 * Output: `'a', 'd', 'a'`
 *
 * @example
 * Returns the intersection between the source array and the passed Observable array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(filterIntersects(of(['a', 'd']))).subscribe();
 * ```
 * Output: `'a', 'd', 'a'`
 *
 * @returns An Observable that emits an Array of the intersection of input and source arrays.
 */
export function filterIntersects<T extends unknown>(
  input: Subscribable<Iterable<T>> | Iterable<T>,
): OperatorFunction<Iterable<T>, T[]> {
  const input$ = createOrReturnObservable(input);
  return (source) =>
    source.pipe(
      withLatestFrom(input$),
      map<[Iterable<T>, Iterable<T>], [T[], Set<T>]>(([value, inputValue]) => [[...value], new Set(inputValue)]),
      map(([value, inputValue]) => value.filter((x) => inputValue.has(x))),
    );
}
