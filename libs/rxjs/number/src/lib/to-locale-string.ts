/**
 * @packageDocumentation
 * @module Number
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a formatted string value from a source number using Number.toLocaleString with
 * optional formatting options provided by Intl.NumberFormat.
 *
 * @param locales The locale or locales that the number is being formatted for
 * @param format Formatting of the string based on
 *   [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
 *
 * @example Return a string with Dutch number formatting
 * ```ts
 * of(1000000).pipe(toLocaleString('nl-NL')).subscribe();
 * ```
 * Output: `'1.000.000'`
 *
 * @example Return a string with UK English number formatting
 * ```ts
 * of(1000000).pipe(toLocaleString('en-GB')).subscribe();
 * ```
 * Output: `'1,000,000'`
 *
 * @example Return a string with UK English number formatting and Euro currency style
 * ```ts
 * of(1000000).pipe(toLocaleString('en-GB', { currency: 'EUR', style: 'currency' })).subscribe();
 * ```
 * Output: `'€1,000,000.00'`
 *
 * @returns Observable that emits a formatted string from a source number
 * @category Formatting
 */
export function toLocaleString(
  locales?: ObservableInput<string | string[]> | string | string[],
  format?: ObservableInput<Intl.NumberFormatOptions> | Intl.NumberFormatOptions,
): OperatorFunction<number, string> {
  const locales$ = (isObservable(locales) ? locales : of(locales)) as Observable<string | string[]>;
  const format$ = (isObservable(format) ? format : of(format)) as Observable<Intl.NumberFormatOptions>;

  return (source: Observable<number>) =>
    source.pipe(
      withLatestFrom(locales$, format$),
      map<[number, string | string[], Intl.NumberFormatOptions], string>(([number, localeValue, formatValue]) =>
        number.toLocaleString(localeValue, formatValue),
      ),
    );
}
