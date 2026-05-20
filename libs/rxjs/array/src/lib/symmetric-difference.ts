/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable Array containing values in either the source or input Array or Set but not both, using
 * Set.prototype.symmetricDifference.
 *
 * @category Filter
 *
 * @typeParam T Item type contained in the Array or Set
 *
 * @param input Array or Set or Observable value to compare against the source
 *
 * @example
 * Returns values present in only one of the two arrays
 * ```ts
 * const input = ['a', 'b', 'c'];
 * of(input).pipe(symmetricDifference(['b', 'c', 'd'])).subscribe();
 * ```
 * Output: `'a', 'd'`
 *
 * @returns An Observable that emits an array of the symmetric difference between source and input
 */
export function symmetricDifference<T extends unknown>(
  input: Subscribable<Iterable<T>> | Iterable<T>,
): OperatorFunction<Iterable<T>, T[]> {
  const input$ = createOrReturnObservable(input);
  return (source) =>
    source.pipe(
      withLatestFrom(input$),
      map(([value, inputValue]) => [...new Set(value).symmetricDifference(new Set(inputValue))]),
    );
}
