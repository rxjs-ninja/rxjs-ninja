/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map|Map} object from a
 * source array.
 *
 * @category Map
 *
 * @typeParam K The type of Map key
 * @typeParam V The type of Map value
 *
 * @example Convert an `Array` into a Map
 * ```ts
 * const input = [ [1, 'a'], [2, 'b'], [3, 'c'] ];
 * of(input).pipe(toMap()).subscribe();
 * ```
 * Output: `Map(3) [1, 'a'], [2, 'b'], [3, 'c']`
 *
 * @returns Observable that emits a `Map` from a source array
 */
export function toMap<K extends unknown, V extends unknown>(): OperatorFunction<[K, V][], Map<K, V>> {
  return (source) => source.pipe(map((value) => new Map<K, V>(value)));
}
