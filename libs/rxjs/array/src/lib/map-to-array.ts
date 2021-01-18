/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits an array from a source
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map|Map} object.
 *
 * @category Map
 *
 * @typeParam K The key type of the source Map
 * @typeParam T The value type of the source Map
 *
 * @example Convert a Map into an Array
 * ```ts
 * const input = new Map([ [1, 'a'], [2, 'b'], [3, 'c'] ]);
 * of(input).pipe(mapToArray()).subscribe();
 * ```
 * Output: `[ [1, 'a'], [2, 'b'], [3, 'c'] ]`
 *
 * @returns Observable that emits a Array from a source Map
 */
export function mapToArray<K extends unknown, T extends unknown>(): OperatorFunction<Map<K, T>, [K, T][]> {
  return (source) => source.pipe(map((value) => [...value]));
}
