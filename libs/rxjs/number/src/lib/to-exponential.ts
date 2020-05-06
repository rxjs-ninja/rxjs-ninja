/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `toExponential` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * subscription number and returns a string based on number raised the exponential value passed
 * [Number.prototype.toExponential](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential)
 *
 * @param exponential The number to raise the value to
 *
 * @example
 * ```ts
 * from([1000, 2000, 3000]).pipe(toExponential(2), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(...) // ['1.00e+3', '2.00e+3', '3.00e+3']
 * ```
 *
 * @returns String of the {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} number raised to the exponential value
 * @category RxJS Number Formatting
 */
export function toExponential(exponential: number): OperatorFunction<number, string> {
  return (source: Observable<number>) => source.pipe(map((value) => value.toExponential(exponential)));
}
