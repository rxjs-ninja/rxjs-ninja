/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable value at the given index in the source Array or Set using Array.prototype.at.
 *
 * @category Query
 *
 * @typeParam T Item type contained in the Array or Set
 *
 * @param index Index to read (supports negative indices)
 *
 * @example
 * Returns the element at index 1
 * ```ts
 * const input = ['a', 'b', 'c'];
 * of(input).pipe(at(1)).subscribe();
 * ```
 * Output: `'b'`
 *
 * @example
 * Returns the last element using a negative index
 * ```ts
 * const input = ['a', 'b', 'c'];
 * of(input).pipe(at(-1)).subscribe();
 * ```
 * Output: `'c'`
 *
 * @returns An Observable that emits the value at the index, or `undefined` if out of range
 */
export function at<T extends unknown>(
  index: Subscribable<number> | number,
): OperatorFunction<Iterable<T>, T | undefined> {
  const index$ = createOrReturnObservable(index);
  return (source) =>
    source.pipe(
      withLatestFrom(index$),
      map(([value, indexValue]) => [...value].at(indexValue)),
    );
}
