/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterIsFloat` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs.dev/api/index/class/Observable) number.
 *
 * The operator will return the number value based on it passing
 * [Number.isInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)
 *
 * @remarks
 * If you want the boolean value instead of the number value use the [[isInteger]] operator instead
 *
 * @example
 * ```ts
 * fromNumber([1, 2, 3.14])
 *  .pipe(filterIsFloat())
 *  .subscribe() // [1, 2]
 * ```
 *
 * @returns A number value that passes the `Number.isInteger` equality check
 * @category RxJS Number Filter
 */
export function filterIsFloat(): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) =>
    source.pipe(filter((value) => !Number.isNaN(value) && Number.isFinite(value) && !Number.isInteger(value)));
}
