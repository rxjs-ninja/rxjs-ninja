/**
 * @packageDocumentation
 * @module Number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `isInteger` operator can be used with an RxJS `pipe` where the source value
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
 *  .pipe(isInteger())
 *  .subscribe(console.log) // [true, true, false]
 * ```
 *
 * @returns A boolean value of the `Number.isInteger` equality check
 * @category RxJS Number Query
 */
export function isInteger(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) => source.pipe(map((value) => Number.isInteger(value)));
}
