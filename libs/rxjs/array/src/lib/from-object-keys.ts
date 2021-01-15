/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits an array from a source `Object` using Object.keys, the array contains
 * the object keys as strings.
 *
 * @category Create
 *
 * @remarks Regardless of Object key type the result Array will have a `string` key value
 *
 * @typeParam K The key type of the source Object
 * @typeParam T The value type of the source Object
 *
 * @example Convert an Object into an array of keys
 * ```ts
 * const input = { 1: 'a', 2: 'b', 3: 'c' };
 * of(input).pipe(fromObjectKeys()).subscribe();
 * ```
 * Output: `[ '1', '2', '3' ]`
 *
 * @returns Observable that emits a Array of strings from a source Object keys
 */
export function fromObjectKeys<K extends string | number | symbol, T extends unknown>(): OperatorFunction<
  Record<K, T>,
  string[]
> {
  return (source) => source.pipe(map((value) => Object.keys(value)));
}
