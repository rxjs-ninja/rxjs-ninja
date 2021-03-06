/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a Object from a source Array.
 *
 * @category Object
 *
 * @typeParam K The type of Object key
 * @typeParam V The type of Object value
 *
 * @example Convert an Array into a Object
 * ```ts
 * const input = [ [1, 'a'], [2, 'b'], [3, 'c'] ];
 * of(input).pipe(toObject()).subscribe();
 * ```
 * Output: `{ 1: 'a', 2: 'b', 3: 'c' }`
 *
 * @returns Observable that emits a Object from a source Array
 */
export function toObject<K extends string | number | symbol, V extends unknown>(): OperatorFunction<
  [K, V][],
  Record<K, V>
> {
  return (source) => source.pipe(map((value) => Object.fromEntries(value) as Record<K, V>));
}
