/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable Array containing the union of unique values from the source and input Array or Set using
 * Set.prototype.union.
 *
 * @category Filter
 *
 * @typeParam T Item type contained in the Array or Set
 *
 * @param input Array or Set or Observable value to union with the source
 *
 * @example
 * Returns the union of the source array and a static array
 * ```ts
 * const input = ['a', 'b', 'c'];
 * of(input).pipe(union(['b', 'c', 'd'])).subscribe();
 * ```
 * Output: `'a', 'b', 'c', 'd'`
 *
 * @returns An Observable that emits an array of the union of source and input values
 */
export function union<T extends unknown>(
  input: Subscribable<Iterable<T>> | Iterable<T>,
): OperatorFunction<Iterable<T>, T[]> {
  const input$ = createOrReturnObservable(input);
  return (source) =>
    source.pipe(
      withLatestFrom(input$),
      map(([value, inputValue]) => [...new Set(value).union(new Set(inputValue))]),
    );
}
