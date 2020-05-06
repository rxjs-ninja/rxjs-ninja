/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `isNaN` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * subscription numbers and returns the boolean value of a number passing the equality check of
 * [Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)
 *
 *
 * @example
 * ```ts
 * from([1, 2, NaN, 4]).pipe(isNaN(), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(...) // [false, false, true, false]
 * ```
 *
 * @returns Boolean value of a number passing the `Number.isNaN` equality check
 * @category RxJS Number Equality
 */
export function isNaN(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) => source.pipe(map((value) => Number.isNaN(value)));
}
