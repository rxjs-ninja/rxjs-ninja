/**
 * @packageDocumentation
 * @module number
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterIsInteger` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number.
 *
 * The operator will return the number value based on it passing
 * [Number.isInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)
 *
 * ![filterIsInteger Marble Diagram](../assets/marble/number/filterIsInteger.svg)
 *
 * @remarks
 * If you want the boolean value instead of the number value use the [[isInteger]] operator instead
 *
 * @example
 * ```ts
 * from([1, 2, 3.14, '4'])
 *  .pipe(
 *    filterIsInteger(),
 *    reduce((acc, val) => {
 *      acc.push(val);
 *      return acc;
 *    }, [])
 * ).subscribe(console.log) // [1, 2]
 * ```
 *
 * @returns A number value that passes the `Number.isInteger` equality check
 * @category RxJS Number Filter
 */
export function filterIsInteger(): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) => source.pipe(filter((value) => Number.isInteger(value)));
}
