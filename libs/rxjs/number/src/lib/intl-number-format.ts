/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable string formatted with `Intl.NumberFormat.prototype.format`.
 *
 * @category Intl
 *
 * @param locales Locales for the formatter
 * @param options `Intl.NumberFormat` options
 *
 * @returns Observable that emits formatted number strings
 */
export function intlNumberFormat(
  locales?: Subscribable<Intl.LocalesArgument> | Intl.LocalesArgument,
  options?: Subscribable<Intl.NumberFormatOptions> | Intl.NumberFormatOptions,
): OperatorFunction<number, string> {
  const locales$ = createOrReturnObservable(locales);
  const options$ = createOrReturnObservable(options);
  return (source) =>
    source.pipe(
      withLatestFrom(locales$, options$),
      map(([value, localeValue, optionValue]) =>
        new Intl.NumberFormat(localeValue, optionValue).format(value),
      ),
    );
}

/**
 * Returns an Observable parts array from `Intl.NumberFormat.prototype.formatToParts`.
 *
 * @category Intl
 *
 * @param locales Locales for the formatter
 * @param options `Intl.NumberFormat` options
 *
 * @returns Observable that emits `Intl.NumberFormatPart` arrays
 */
export function intlNumberFormatParts(
  locales?: Subscribable<Intl.LocalesArgument> | Intl.LocalesArgument,
  options?: Subscribable<Intl.NumberFormatOptions> | Intl.NumberFormatOptions,
): OperatorFunction<number, Intl.NumberFormatPart[]> {
  const locales$ = createOrReturnObservable(locales);
  const options$ = createOrReturnObservable(options);
  return (source) =>
    source.pipe(
      withLatestFrom(locales$, options$),
      map(([value, localeValue, optionValue]) =>
        new Intl.NumberFormat(localeValue, optionValue).formatToParts(value),
      ),
    );
}

/**
 * Returns an Observable string from `Intl.NumberFormat.prototype.formatRange` for tuple emissions `[start, end]`.
 *
 * @category Intl
 *
 * @param locales Locales for the formatter
 * @param options `Intl.NumberFormat` options
 *
 * @returns Observable that emits formatted range strings
 */
export function intlNumberFormatRange(
  locales?: Subscribable<Intl.LocalesArgument> | Intl.LocalesArgument,
  options?: Subscribable<Intl.NumberFormatOptions> | Intl.NumberFormatOptions,
): OperatorFunction<[number, number], string> {
  const locales$ = createOrReturnObservable(locales);
  const options$ = createOrReturnObservable(options);
  return (source) =>
    source.pipe(
      withLatestFrom(locales$, options$),
      map(([[start, end], localeValue, optionValue]) =>
        new Intl.NumberFormat(localeValue, optionValue).formatRange(start, end),
      ),
    );
}
