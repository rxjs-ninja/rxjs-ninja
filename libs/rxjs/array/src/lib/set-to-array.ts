/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits an Array from a source Set.
 *
 * @category Set
 *
 * @typeParam T The type of value contained in the Set
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
