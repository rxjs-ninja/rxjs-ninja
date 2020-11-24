/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterInRange` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs.dev/api/index/class/Observable) number and will return the number
 * value if the number is within a min/max value range. The optional `excludeBoundingValues` parameter allows
 * the min and max values to be excluded.
 *
 * - If you want to get the boolean value of a number being outside a range of min/max use [[inRange]] operator instead
 * - If you want the number value being outside a range of min/max use the [[filterInRange]] operator instead
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
 * // Exluding the bounding number
 * fromNumber([-1, 0, 1, 2, 10, 11])
 *  .pipe(filterInRange(0, 10))
 *  .subscribe(console.log) // [0, 1, 2, 10]
 * ```
 *
 * @example
 * ```ts
 * fromNumber([-1, 0, 1, 2, 10, 11])
 *  .pipe(filterInRange(0, 10, true))
 *  .subscribe(console.log) // [1, 2]
 * ```
 *
 * @returns Number value if the number falls in the `min/max` range
 * @category RxJS Number Filter
 */
export function filterInRange(
  min: number,
  max: number,
  excludeBoundingValues?: boolean,
): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) =>
    source.pipe(filter((value) => (excludeBoundingValues ? value > min && value < max : value >= min && value <= max)));
}
