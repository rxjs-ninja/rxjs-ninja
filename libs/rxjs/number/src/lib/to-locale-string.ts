/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `toLocaleString` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number for formats it using
 * [Number.prototype.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)
 * and the passed locale option.
 *
 * @param locales The locale or locales that the number is being formatted for
 *
 * @example
 * ```ts
 * fromNumber(1000000)
 *  .pipe(toLocaleString('nl-NL'))
 *  .subscribe(console.log) // '1.000.000'
 * ```
 * @example
 * ```ts
 * fromNumber(1000000)
 *  .pipe(toLocaleString('en-GB'))
 *  .subscribe(console.log) // '1,000,000'
 * ```
 *
 * @returns String of the number formatted using `Number.prototype.toLocaleString`
 * @category RxJS Number Formatting
 */
function toLocaleString(locales: string | string[]): OperatorFunction<number, string>;
/**
 * The `toLocaleString` uses locale options in [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
 * to provide additional formatting for values types such as currency
 *
 * @param locales The locale or locales that the number is being formatted for
 * @param format Formatting of the string based on [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
 *
 * @example
 * ```ts
 * fromNumber(1000000)
 *  .pipe(toLocaleString('en-GB', { currency: 'EUR', style: 'currency' }))
 *  .subscribe(console.log) // '€1,000,000.00'
 * ```
 *
 * @returns String of the number formatted using `Number.prototype.toLocaleString`
 * @category RxJS Number Formatting
 */
function toLocaleString(locales: string | string[], format: Intl.NumberFormatOptions): OperatorFunction<number, string>;
function toLocaleString(locales: string | string[], format?: Intl.NumberFormatOptions): OperatorFunction<number, string> {
  return (source: Observable<number>) => source.pipe(map((number) => number.toLocaleString(locales, format)));
}

export { toLocaleString };
