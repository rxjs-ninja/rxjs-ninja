/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a Set from a source Array.
 *
 * @category Set
 *
 * @typeParam T The input type of the source Array or Set
 *
 * @example Convert an Array into a Set
 * ```ts
 * const input = [1, 1, 2, 3, 3, 4, 5];
 * of(input).pipe(toSet()).subscribe();
 * ```
 * Output: `Set(5) {1, 2, 3, 4, 5}`
 *
 * @returns Observable that emits a Set from a source Array
 */
export function toSet<T extends unknown>(): OperatorFunction<T[], Set<T>> {
  return (source) => source.pipe(map((value) => new Set<T>(value)));
}
