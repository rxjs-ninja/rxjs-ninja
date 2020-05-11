/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `toLocaleString` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number.
 *
 * The operator will return a string value of the number formatted using
 * [Number.prototype.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)
 *
 * @remarks
 * The `toLocaleString` uses locale options in [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
 *
 * @param locales The locale or locales that the number is being formatted for
 * @param format Optional formatting of the string based on [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
 *
 * @example
 * ```ts
 * from([1000000]).pipe(toLocaleString('en-GB', { currency: 'EUR', style: 'currency' }), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(console.log) // ['€1,000,000.00']
 * ```
 *
 * @returns String of the number formatted using `Number.prototype.toLocaleString`
 * @category RxJS Number Formatting
 */
export function toLocaleString(locales: string | string[], format?: Intl.NumberFormatOptions): OperatorFunction<number, string> {
  return (source: Observable<number>) => source.pipe(map((number) => number.toLocaleString(locales, format)));
}
