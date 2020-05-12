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
 * The operator will return the boolean value based on it using
 * [Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)
 * to check a number is valid
 *
 * @example
 * ```ts
 * fromNumber([1, 2, NaN, 4])
 *  .pipe(isNotNaN())
 *  .subscribe(console.log) // [true, true, false, true]
 * ```
 *
 * @returns A boolean value of the `Number.isNaN` equality check
 * @category RxJS Number Query
 */
export function isNotNaN(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) => source.pipe(map((value) => !Number.isNaN(value)));
}
