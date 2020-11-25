import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable array of values, the array length is based on the Observable source array, but some or all the
 * values are replaced with the `fillWith` parameter.
 *
 * Optionally a `start` index from 0 can be passed to fill from, all members before this will be left.
 * The `fillTo` value is the index to stop at (e.g. In the array `[0, 0, 0, 0, 0]` index `4` will be `[ 0, 1, 1, 1, 0 ]`
 *
 * @param fillWith The value to fill in the array
 * @param start The index to start filling from
 * @param fillTo The value to stop filling at
 *
 * @example
 * ```ts
 * const input = ['The', 'Cake', 'is', 'a', 'lie'];
 * of(input).pipe(fill('CAKE!')).subscribe();
 * // ['CAKE!', 'CAKE!', 'CAKE!', 'CAKE!', 'CAKE!']
 * ```
 *
 * @returns Observable array of values with some or all of the source array values replaces with the `fillValue`
 * @category RxJS Array Modify
 */
export function fill<T extends unknown, K extends T | unknown>(
  fillWith: K,
  start = 0,
  fillTo?: number,
): OperatorFunction<T[], K[]> {
  return (source: Observable<T[]>) =>
    source.pipe(map((value: T[]) => value.fill(fillWith as never, start, fillTo) as K[]));
}
