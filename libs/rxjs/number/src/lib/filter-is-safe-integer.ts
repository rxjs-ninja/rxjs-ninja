/**
 * @packageDocumentation
 * @module number
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterIsSafeInteger` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs.dev/api/index/class/Observable) number.
 *
 * The operator will return the number value based on it passing
 * [Number.isSafeInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger)
 *
 * @remarks
 * If you want the boolean value instead of the number value use the [[isSafeInteger]] operator instead
 *
 * @example
 * ```ts
 * fromNumber([1, 2, Math.pow(2, 53), Math.pow(2, 53) - 1])
 *  .pipe(filterIsSafeInteger())
 *  .subscribe(console.log) // [1, 2, 9007199254740991]
 * ```
 *
 * @returns A number value that passes the `Number.isSafeInteger` equality check
 * @category RxJS Number Filter
 */
export function filterIsSafeInteger(): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) => source.pipe(filter((value) => Number.isSafeInteger(value)));
}
