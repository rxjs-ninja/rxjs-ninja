/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable Array containing unique values that are not in the provided input Array or Set
 *
 * @category Filter
 *
 * @see [[filterDifference]] operator for an Array containing potential duplicate differences
 *
 * @typeParam T Item type contained in the Array/Set
 *
 * @param input Array/Set or Observable value to compare against for the difference
 *
 * @example
 * Returns the difference between the source array and the passed static array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(difference(['a', 'c'])).subscribe();
 * ```
 * Output: `['b', 'd']`
 *
 * @example
 * Returns the difference between the source array and the passed Observable array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(difference(of(['a', 'c']))).subscribe();
 * ```
 * Output: `['b', 'd']`
 *
 * @returns An Observable that emits an Array containing a subset of the source value
 */
export function difference<T extends unknown>(
  input: Subscribable<Iterable<T>> | Iterable<T>,
): OperatorFunction<Iterable<T>, T[]> {
  const input$ = createOrReturnObservable(input);
  return (source) =>
    source.pipe(
      withLatestFrom(input$),
      map(([value, inputValue]) => [new Set(value), new Set(inputValue)]),
      map(([value, inputValue]) => [...value].filter((x) => !inputValue.has(x))),
    );
}
