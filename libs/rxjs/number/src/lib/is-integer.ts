/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `isInteger` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * subscription numbers and returns the boolean value of a number passing the equality check of
 * [Number.isInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)
 *
 * @remarks
 * If you want to return the numbers from the check use the [[filterIsInteger]] operator instead
 *
 * @example
 * ```ts
 * from([1, 2, 3.14, '4']).pipe(isInteger(), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(...) // [true, true, false, false]
 * ```
 *
 * @returns Boolean value of a number passing the `Number.isInteger` equality check
 * @category RxJS Number Query
 */
export function isInteger(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) => source.pipe(map((value) => Number.isInteger(value)));
}
