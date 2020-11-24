/**
 * @packageDocumentation
 * @module Number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `inRange` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs.dev/api/index/class/Observable) number and will return a boolean
 * value if the number is within a min/max value range. The optional `excludeBoundingValues` parameter allows
 * the min and max values to be excluded.
 *
 * - If you want to get the boolean value of a number being outside a range of min/max use [[outOfRange]] operator instead
 * - If you want the number value instead of the boolean value use the [[filterInRange]] operator instead
 *
 * If `excludeBoundingValues` is set to `true`, the range will not include the actual `min` and `max` values
 * by using `> && <` as it's equality match
 *
 * The default value is `false` and will use a `>= && <=` equality match
 *
 * @param min The minimum number for the range
 * @param max The maximum number for the range
 * @param excludeBoundingValues If bounding values should be excluded
 *
 * @example
 * ```ts
 * fromNumber([-1, 0, 1, 2, 10, 11])
 *  .pipe(inRange(0, 10))
 *  .subscribe(console.log) // [false, true, true, true, true, false]
 * ```
 *
 * @example
 * ```ts
 * fromNumber([-1, 0, 1, 2, 10, 11])
 *  .pipe(inRange(0, 10, true))
 *  .subscribe(console.log) // [false, false, true, true, false, false]
 * ```
 *
 * @returns Boolean value if the number falls in the `min/max` range
 * @category RxJS Number Query
 */
export function inRange(min: number, max: number, excludeBoundingValues?: boolean): OperatorFunction<number, boolean> {
  return (source: Observable<number>) =>
    source.pipe(map((value) => (excludeBoundingValues ? value > min && value < max : value >= min && value <= max)));
}
