/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `toLocaleString` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * subscription number and returns a formatted string based the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat|Intl.NumberFormat}
 * options passed as options
 * [Number.prototype.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)
 *
 * @param locales The locale or locales that the number is being formatted for
 * @param format Optional formatting of the string based on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat|Intl.NumberFormat}
 *
 * @example
 * ```ts
 * from([1000000]).pipe(toLocaleString('en-GB', { currency: 'EUR', style: 'currency' }), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(...) // ['€1,000,000.00']
 * ```
 *
 * @returns String of the {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} number formatted to the passed options
 * @category RxJS Number Formatting
 */
export function toLocaleString(locales: string | string[], format?: Intl.NumberFormatOptions): OperatorFunction<number, string> {
  return (source: Observable<number>) => source.pipe(map((number) => number.toLocaleString(locales, format)));
}
