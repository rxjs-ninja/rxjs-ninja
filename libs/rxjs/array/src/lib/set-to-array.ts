/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits an array from a source
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set|Set} object.
 *
 * @category Set
 *
 * @typeParam T The input type of the source Set
 *
 * @example Convert a Set into an Array
 * ```ts
 * const input = new Set([1, 1, 2, 3, 3, 4, 5]);
 * of(input).pipe(setToArray()).subscribe();
 * ```
 * Output: `[1, 2, 3, 4, 5]`
 *
 * @returns Observable that emits a Array from a source Set
 */
export function setToArray<T extends unknown>(): OperatorFunction<Set<T>, T[]> {
  return (source) => source.pipe(map((value) => [...value]));
}
