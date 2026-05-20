/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits an array from a source Object using Object.values.
 *
 * @category Object
 *
 * @typeParam K The key type of the source Object
 * @typeParam T The value type of the source Object
 *
 * @example
 * Convert an Object into an array of values
 * ```ts
 * const input = { 1: 'a', 2: 'b', 3: 'c' };
 * of(input).pipe(objectValuesToArray()).subscribe();
 * ```
 * Output: `[ 'a', 'b', 'c' ]`
 *
 * @returns Observable that emits an Array of values from a source Object
 */
export function objectValuesToArray<K extends string | number | symbol, T extends unknown>(): OperatorFunction<
  Record<K, T>,
  T[]
> {
  return (source) => source.pipe(map((value) => Object.values(value)));
}
