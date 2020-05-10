/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `toExponential` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number.
 *
 * The operator will return a string value of the number raised to the power passed as a parameter using
 * [Number.prototype.toExponential](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential)
 *
 * @param exponential The exponential value to raise the number by
 *
 * @example
 * ```ts
 * from([1000, 2000, 3000]).pipe(toExponential(2), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(...) // ['1.00e+3', '2.00e+3', '3.00e+3']
 * ```
 *
 * @returns String of the number value raised to the exponential using `Number.prototype.toExponential`
 * @category RxJS Number Formatting
 */
export function toExponential(exponential: number): OperatorFunction<number, string> {
  return (source: Observable<number>) => source.pipe(map((value) => value.toExponential(exponential)));
}
