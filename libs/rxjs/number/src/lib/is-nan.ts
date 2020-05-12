/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `isNaN` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number.
 *
 * The operator will return the boolean value based on it passing
 * [Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)
 *
 * @example
 * ```ts
 * fromNumber([1, 2, NaN, 4])
 *  .pipe(isNaN())
 *  .subscribe(console.log) // [false, false, true, false]
 * ```
 *
 * @returns A boolean value of the `Number.isNaN` equality check
 * @category RxJS Number Query
 */
export function isNaN(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) => source.pipe(map((value) => Number.isNaN(value)));
}
