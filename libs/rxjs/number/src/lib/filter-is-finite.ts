/**
 * @packageDocumentation
 * @module number
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterIsFinite` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number.
 *
 * The operator will return the number value based on it passing
 * [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite)
 *
 * @remarks
 * If you want the boolean value instead of the number value use the [[isFinite]] operator instead
 *
 * @example
 * ```ts
 * fromNumber([1, 2, Infinity])
 *  .pipe(filterIsFinite())
 *  .subscribe(console.log) // [1, 2]
 * ```
 *
 * @returns A number value that passes the `Number.isFinite` equality check
 * @category RxJS Number Filter
 */
export function filterIsFinite(): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) => source.pipe(filter((value) => Number.isFinite(value)));
}
