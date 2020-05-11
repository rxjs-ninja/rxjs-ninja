/**
 * @packageDocumentation
 * @module number
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterIsNotNaN` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number.
 *
 * The operator will return the number value based on the number not being a NaN using the
 * [Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)
 * equality check
 *
 * @remarks
 * If you want the boolean value instead of the number value use the [[isNotNaN]] operator instead
 *
 * @example
 * ```ts
 * fromNumber([1, 2, NaN, 4])
 *  .pipe(
 *    filterIsNotNaN(),
 *    reduce((acc, val) => {
 *      acc.push(val);
 *      return acc;
 *    }, [])
 * ).subscribe(console.log) // [1, 2, 4]
 * ```
 *
 * @returns Number value that does not passes the `Number.isNaN` equality check
 * @category RxJS Number Filter
 */
export function filterIsNotNaN(): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) => source.pipe(filter((value) => Number.isInteger(value)));
}
