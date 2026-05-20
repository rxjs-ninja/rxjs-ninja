/**
 * @packageDocumentation
 * @module String
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable string joining a source iterable of strings with `Intl.ListFormat.prototype.format`.
 *
 * @category Intl
 *
 * @param locales Locales for the list formatter
 * @param options `Intl.ListFormat` options
 *
 * @returns Observable that emits the formatted list string
 */
export function intlListFormat(
  locales?: Subscribable<Intl.LocalesArgument> | Intl.LocalesArgument,
  options?: Subscribable<Intl.ListFormatOptions> | Intl.ListFormatOptions,
): OperatorFunction<Iterable<string>, string> {
  const locales$ = createOrReturnObservable(locales);
  const options$ = createOrReturnObservable(options);
  return (source) =>
    source.pipe(
      withLatestFrom(locales$, options$),
      map(([value, localeValue, optionValue]) =>
        new Intl.ListFormat(localeValue, optionValue).format([...value]),
      ),
    );
}
