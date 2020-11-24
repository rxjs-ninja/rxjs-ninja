/**
 * @packageDocumentation
 * @module Number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `outOfRange` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs.dev/api/index/class/Observable) number and will return a boolean
 * value if the number is outside a min/max value range. The optional `includeBoundingParameters` parameter allows
 * the min and max values to be included.
 *
 * * If you want to get the boolean value of a number being inside a range of min/max use [[inRange]] operator instead
 * * If you want the number value instead of the boolean value use the [[filterOutOfRange]] operator instead
 *
 * @param min The minimum number for the range
 * @param max The maximum number for the range
 *
 * If `includeBoundingParameters` is set to `true`, the range will include the actual `min` and `max` values
 * by using `>= || <=` as it's equality match
 *
 * The default value is `false` and will use a `> || <` equality match
 *
 * @param min The minimum number for the range
 * @param max The maximum number for the range
 * @param includeBoundingParameters If bounding values should be excluded
 *
 * @example
 * ```ts
 * fromNumber([-1, 0, 1, 2, 10, 11])
 *  .pipe(outOfRange(0, 10))
 *  .subscribe(console.log) // [true, false, false, false, false, true]
 * ```
 *
 * @example
 * ```ts
 * fromNumber([-1, 0, 1, 2, 10, 11])
 *  .pipe(outOfRange(0, 10, true))
 *  .subscribe(console.log) // [true, true, false, false, true, true]
 * ```
 *
 * @returns Boolean value if the number falls outside the `min/max` range
 * @category RxJS Number Query
 */
export function outOfRange(
  min: number,
  max: number,
  includeBoundingParameters?: boolean,
): OperatorFunction<number, boolean> {
  return (source: Observable<number>) =>
    source.pipe(
      map((value) => (includeBoundingParameters ? value <= min || value >= max : value < min || value > max)),
    );
}
