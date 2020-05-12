/**
 * @packageDocumentation
 * @module number
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterInRange` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number.
 *
 * The operator will return the number value if the source value is within a passed min and max range
 *
 * @param min The minimum number for the range
 * @param max The maximum number for the range
 *
 * @remarks
 * If you want the boolean value if a number is inside a range of min/max use [[inRange]] operator instead
 *
 * If you want the number value outside of the min/max range use [[filterOutOfRange]] operator instead
 *
 * @example
 * ```ts
 * from([1, 20, 5, 10])
 *  .pipe(filterInRange(0, 10))
 *  .subscribe(console.log) // [1, 5, 10]
 * ```
 *
 * @returns Number value if the number falls in the `min/max` range
 * @category RxJS Number Filter
 */
function filterInRange(min: number, max: number): MonoTypeOperatorFunction<number>;

/**
 * @param min The minimum number for the range
 * @param max The maximum number for the range
 * @param noBoundsMatch If set to true the min and max range will be excluded from the inner bounds
 *
 * @example
 * ```ts
 * from([1, 20, 5, 10])
 *  .pipe(filterInRange(0, 10, true))
 *  .subscribe(console.log) // [1, 5]
 * ```
 * @category RxJS Number Filter
 */
function filterInRange(min: number, max: number, noBoundsMatch: boolean): MonoTypeOperatorFunction<number>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterInRange(...args: any): MonoTypeOperatorFunction<number> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inArgs: any[] = [...args];
  return (source: Observable<number>) =>
    source.pipe(filter((value) => (inArgs[2] ? value > inArgs[0] && value < inArgs[1] : value >= inArgs[0] && value <= inArgs[1])));
}

export { filterInRange };
