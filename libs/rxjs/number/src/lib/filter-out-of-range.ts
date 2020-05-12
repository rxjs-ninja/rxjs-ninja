/**
 * @packageDocumentation
 * @module number
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterOutOfRange` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number.
 *
 * The operator will return the bollean value if the source value is within a passed min and max range
 *
 * @param min The minimum number for the range
 * @param max The maximum number for the range
 *
 * @remarks
 * With the `noBoundsMatch` set to true the check will be `val > min && val < min`. The default is `val >= min && val <= max`
 *
 * @remarks
 * If you want the boolean value if a number is outside a range of min/max use [[outOfRange]] operator instead
 * If you want the number value inside of the min/max range use [[filterInRange]] operator instead
 *
 * @example
 * ```ts
 * from([1, 20, 5, 10])
 *  .pipe(filterOutOfRange(0, 10))
 *  .subscribe(console.log) // [20]
 * ```
 *
 * @returns Number value if the number falls outside the `min/max` range
 * @category RxJS Number Filter
 */
function filterOutOfRange(min: number, max: number): MonoTypeOperatorFunction<number>;

/**
 * @param min The minimum number for the range
 * @param max The maximum number for the range
 * @param noBoundsMatch If set to true the min and max values are not included in the evaluation
 * @example
 * ```ts
 * from([1, 20, 5, 10])
 *  .pipe(filterOutOfRange(0, 10, true))
 *  .subscribe(console.log) // [20, 10]
 * ```
 * @category RxJS Number Filter
 */
function filterOutOfRange(min: number, max: number, noBoundsMatch?: boolean): MonoTypeOperatorFunction<number>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterOutOfRange(...args: any): MonoTypeOperatorFunction<number> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inArgs: any[] = [...args];
  return (source: Observable<number>) =>
    source.pipe(filter((value) => (inArgs[2] ? value <= inArgs[0] || value >= inArgs[1] : value < inArgs[0] || value > inArgs[1])));
}

export { filterOutOfRange };
