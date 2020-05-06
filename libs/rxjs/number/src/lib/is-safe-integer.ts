/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `isSafeInteger` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * subscription numbers and returns the boolean value of a number passing the equality check of
 * [Number.isSafeInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger)
 *
 * @remarks
 * If you want to return the numbers from the check use the [[fromIsSafeInteger]] operator instead
 *
 * @example
 * ```ts
 * from([Math.pow(2, 53), Math.pow(2, 53) - 1]).pipe(isSafeInteger(), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(...) // [true, false]
 * ```
 *
 * @returns Boolean value of a number passing the `Number.isSafeInteger` equality check
 * @category RxJS Number Equality
 */
export function isSafeInteger(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) => source.pipe(map((value) => Number.isSafeInteger(value)));
}
