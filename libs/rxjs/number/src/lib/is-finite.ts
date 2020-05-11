/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `isFinite` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number.
 *
 * The operator will return the boolean value based on it passing
 * [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite)
 *
 * ![isFinite Marble Diagram](../assets/marble/number/isFinite.svg)
 *
 * @remarks
 * If you want the number value instead of the boolean value use the [[filterIsFinite]] operator instead
 *
 * @example
 * ```ts
 * from([1, 2, Infinity])
 *  .pipe(
 *    isFinite(),
 *    reduce((acc, val) => {
 *      acc.push(val);
 *      return acc;
 *    }, [])
 * ).subscribe(console.log) // [true, true, false]
 * ```
 *
 * @returns A boolean value of the `Number.isFinite` equality check
 * @category RxJS Number Query
 */
export function isFinite(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) => source.pipe(map((value) => Number.isFinite(value)));
}
