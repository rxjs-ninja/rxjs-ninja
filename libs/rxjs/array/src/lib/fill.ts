/**
 * @packageDocumentation
 * @module Array
 */

import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable array of values, the array length is based on the Observable source array, but some or all the
 * values are replaced with the `fillWith` parameter.
 *
 * @remarks
 * Optionally a `start` index from 0 can be passed to fill from, all members before this will be left as their original values.
 * The `fillTo` value is the index to stop at (e.g. In the array `[0, 0, 0, 0, 0]` index `4` will be `[ 0, 1, 1, 1, 0 ]`
 *
 * @param fillWith The value to replace the existing value in the source array with
 * @param start The index to start filling from. Default is 0
 * @param fillTo The index to stop filling at
 *
 * @example
 * ```ts
 * const input = ['The', 'Cake', 'is', 'a', 'lie'];
 * of(input).pipe(fill('CAKE!')).subscribe();
 * // ['CAKE!', 'CAKE!', 'CAKE!', 'CAKE!', 'CAKE!']
 * ```
 *
 * @example
 * ```ts
 * const input = ['The', 'Cake', 'is', 'a', 'lie'];
 * of(input).pipe(fill('CAKE!', 2)).subscribe();
 * // ['The', 'Cake', 'CAKE!', 'CAKE!', 'CAKE!']
 * ```
 *
 * @example
 * ```ts
 * const input = ['The', 'Cake', 'is', 'a', 'lie'];
 * of(input).pipe(fill('CAKE!', 2, 4)).subscribe();
 * // ['The', 'Cake', 'CAKE!', 'CAKE!', 'lie']
 * ```
 *
 * @returns An Observable that emits an array of values where some or all of the source array values are replaced with the `fillValue`
 * @category Array Modify
 */
export function fill<T extends unknown, K extends T | unknown>(
  fillWith: K,
  start = 0,
  fillTo?: number,
): OperatorFunction<T[], K[]> {
  return (source: Observable<T[]>) =>
    source.pipe(map((value: T[]) => value.fill(fillWith as never, start, fillTo) as K[]));
}
