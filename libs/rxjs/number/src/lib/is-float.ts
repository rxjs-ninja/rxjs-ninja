/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `isFloat` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs.dev/api/index/class/Observable) number.
 *
 * The operator will return the boolean value based on it passing
 * [Number.isInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)
 *
 * @remarks
 * If you want the number value instead of the boolean value use the [[filterIsInteger]] operator instead
 *
 * @example
 * ```ts
 * fromNumber([1, 2, 3.14])
 *  .pipe(isFloat())
 *  .subscribe(console.log) // [false, false, true]
 * ```
 *
 * @returns Boolean if the number is a valid float
 * @category RxJS Number Query
 */
export function isFloat(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) =>
    source.pipe(map((value) => !Number.isNaN(value) && Number.isFinite(value) && !Number.isInteger(value)));
}