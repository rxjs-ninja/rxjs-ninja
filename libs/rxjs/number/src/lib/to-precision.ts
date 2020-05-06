/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `toPrecision` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * subscription number and returns a string based on number formatted to the passed precision value
 * [Number.prototype.toPrecision](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision)
 *
 * @param precision The precision value to format the number to
 *
 * @example
 * ```ts
 * from([123.456, 0.004, 1.23e5]).pipe(toPrecision(4), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(...) // ['123.5', '0.004000', '1.230e+5']
 * ```
 *
 * @returns String of the {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} number raised to the exponential value
 * @category RxJS Number Formatting
 */
export function toPrecision(precision: number): OperatorFunction<number, string> {
  return (source: Observable<number>) => source.pipe(map((value) => value.toPrecision(precision)));
}
