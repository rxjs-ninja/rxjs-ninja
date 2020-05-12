/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `outOfRange` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number.
 *
 * The operator will return the boolean if the source value is outside a passed min and max range
 *
 * @param min The minimum number for the range
 * @param max The maximum number for the range
 *
 * @remarks
 * With the `noBoundsMatch` set to true the check will be `val < min && val > min`. The default is `val <= min && val >= max`
 *
 * @remarks
 * If you want to find if a number is between a range of min/max use [[inRange]] operator instead
 * If you want the number value instead of the boolean value use the [[filterOutOfRange]] operator instead
 *
 * @example
 * ```ts
 * from([1, 20, 5, 10])
 *  .pipe(outOfRange(0, 10))
 *  .subscribe(console.log) // [false, true, false, false]
 * ```
 *
 * @returns Boolean value if the number falls in the `min/max` range
 * @category RxJS Number Query
 */
function outOfRange(min: number, max: number): OperatorFunction<number, boolean>;
/**
 *
 * @param min The minimum number for the range
 * @param max The maximum number for the range
 * @param noBoundsMatch If set to true the min and max values are not included in the evaluation
 * @example
 * ```ts
 * from([1, 20, 5, 10])
 *  .pipe(outOfRange(0, 10, true))
 *  .subscribe(console.log) // [false, true, false, true]
 * ```
 * @category RxJS Number Query
 */
function outOfRange(min: number, max: number, noBoundsMatch?: boolean): OperatorFunction<number, boolean>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function outOfRange(...args: any): OperatorFunction<number, boolean> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inArgs: any[] = [...args];
  return (source: Observable<number>) =>
    source.pipe(map((value) => (inArgs[2] ? value <= inArgs[0] || value >= inArgs[1] : value < inArgs[0] || value > inArgs[1])));
}

export { outOfRange };
