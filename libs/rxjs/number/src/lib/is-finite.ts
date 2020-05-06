/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `isFinite` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * subscription numbers and returns the boolean value of a number passing the equality check of
 * [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite)
 *
 * @remarks
 * If you want to return the numbers from the check use the [[fromIsFinite]] operator instead
 *
 * @example
 * ```ts
 * from([1, 2, Infinity]).pipe(isFinite(), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(...) // [true, true, false]
 * ```
 *
 * @returns Boolean value of a number passing the `Number.isFinite` equality check
 * @category RxJS Number Equality
 */
export function isFinite(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) => source.pipe(map((value) => Number.isFinite(value)));
}
