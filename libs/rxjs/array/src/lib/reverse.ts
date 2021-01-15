/**
 * @packageDocumentation
 * @module Array
 */

import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits array taking the source and running the result of Array.reverse
 *
 * @category Modify
 *
 * @typeParam T Item type contained in the Array/Set
 *
 * @example
 * Reverse an array of values
 * ```ts
 * const input = ['Hello', 'RxJS', 'Ninja'];
 * of(input).pipe(reverse()).subscribe();
 * ```
 * Output: `['Ninja', 'RxJS', 'Hello']`
 *
 * @returns Observable that emits an array which is reversed from the source array
 */
export function reverse<T extends unknown>(): OperatorFunction<T[] | Set<T>, T[]> {
  return (source) => source.pipe(map((value) => [...value].reverse()));
}
