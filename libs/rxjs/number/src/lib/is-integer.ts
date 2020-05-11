/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `isInteger` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number.
 *
 * The operator will return the boolean value based on it passing
 * [Number.isInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)
 *
 * @remarks
 * If you want the number value instead of the boolean value use the [[filterIsInteger]] operator instead
 *
 * @example
 * ```ts
 * from([1, 2, 3.14, '4'])
 *  .pipe(
 *    isInteger(),
 *    reduce((acc, val) => {
 *      acc.push(val);
 *      return acc;
 *    }, [])
 * ).subscribe(console.log) // [true, true, false, false]
 * ```
 *
 * @returns A boolean value of the `Number.isInteger` equality check
 * @category RxJS Number Query
 */
export function isInteger(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) => source.pipe(map((value) => Number.isInteger(value)));
}
