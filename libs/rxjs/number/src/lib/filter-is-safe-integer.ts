/**
 * @packageDocumentation
 * @module number
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterIsSafeInteger` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number.
 *
 * The operator will return the number value based on it passing
 * [Number.isSafeInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger)
 *
 * ![filterIsSafeInteger Marble Diagram](../assets/marble/number/filterIsSafeInteger.svg)
 *
 * @remarks
 * If you want the boolean value instead of the number value use the [[isSafeInteger]] operator instead
 *
 * @example
 * ```ts
 * from([1, 2, Math.pow(2, 53), Math.pow(2, 53) - 1])
 *  .pipe(
 *    filterIsSafeInteger(),
 *    reduce((acc, val) => {
 *      acc.push(val);
 *      return acc;
 *    }, [])
 * ).subscribe(console.log) // [1, 2, 9007199254740991]
 * ```
 *
 * @returns A number value that passes the `Number.isSafeInteger` equality check
 * @category RxJS Number Filter
 */
export function filterIsSafeInteger(): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) => source.pipe(filter((value) => Number.isSafeInteger(value)));
}
