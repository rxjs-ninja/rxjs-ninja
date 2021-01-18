/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set|Set} object from a
 * source array.
 *
 * @category Map
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
 * @returns Observable that emits a `Set` from a source array
 */
export function toMap<K extends unknown, V extends unknown>(): OperatorFunction<[K, V][], Map<K, V>> {
  return (source) => source.pipe(map((value) => new Map<K, V>(value)));
}
