/**
 * @packageDocumentation
 * @module Array
 */

import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable array of the source array reversed in order
 *
 * @example
 * ```ts
 * const input = ['Hello', 'RxJS', 'Ninja'];
 * of(input).pipe(reverse()).subscribe();
 * // ['Ninja', 'RxJS', 'Hello']
 * ```
 *
 * @returns Observable array of the source array reversed.
 * @category RxJS Array Modify
 */
export function reverse<T extends unknown>(): OperatorFunction<T[], T[]> {
  return (source: Observable<T[]>) => source.pipe(map((value) => [...value].reverse()));
}
