/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `isSafeInteger` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs.dev/api/index/class/Observable) number.
 *
 * The operator will return the boolean value based on it passing
 * [Number.isSafeInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger)
 *
 * @remarks
 * If you want to return the numbers from the check use the [[filterIsSafeInteger]] operator instead
 *
 * @example
 * ```ts
 * fromNumber([Math.pow(2, 53), Math.pow(2, 53) - 1])
 *  .pipe(isSafeInteger())
 *  .subscribe(console.log) // [true, false]
 * ```
 *
 * @returns A boolean value of the `Number.isSafeInteger` equality check
 * @category RxJS Number Query
 */
export function isSafeInteger(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) => source.pipe(map((value) => Number.isSafeInteger(value)));
}
