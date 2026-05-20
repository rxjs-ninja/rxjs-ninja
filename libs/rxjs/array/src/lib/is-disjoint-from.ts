/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable boolean indicating whether the source and input Array or Set share no values, using
 * Set.prototype.isDisjointFrom.
 *
 * @category Query
 *
 * @typeParam T Item type contained in the Array or Set
 *
 * @param input Array or Set or Observable value to compare against the source
 *
 * @example
 * Returns whether two arrays have no elements in common
 * ```ts
 * const input = ['a', 'b'];
 * of(input).pipe(isDisjointFrom(['c', 'd'])).subscribe();
 * ```
 * Output: `true`
 *
 * @returns An Observable that emits whether the source and input sets are disjoint
 */
export function isDisjointFrom<T extends unknown>(
  input: Subscribable<Iterable<T>> | Iterable<T>,
): OperatorFunction<Iterable<T>, boolean> {
  const input$ = createOrReturnObservable(input);
  return (source) =>
    source.pipe(
      withLatestFrom(input$),
      map(([value, inputValue]) => new Set(value).isDisjointFrom(new Set(inputValue))),
    );
}
