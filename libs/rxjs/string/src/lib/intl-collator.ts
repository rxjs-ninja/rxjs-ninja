/**
 * @packageDocumentation
 * @module String
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable number comparing the source string to another using `Intl.Collator.prototype.compare`.
 *
 * @category Intl
 *
 * @param that String to compare against
 * @param locales Locales for the collator
 * @param options `Intl.Collator` options
 *
 * @returns Observable that emits the compare result
 */
export function intlCollatorCompare(
  that: Subscribable<string> | string,
  locales?: Subscribable<Intl.LocalesArgument> | Intl.LocalesArgument,
  options?: Subscribable<Intl.CollatorOptions> | Intl.CollatorOptions,
): OperatorFunction<string, number> {
  const that$ = createOrReturnObservable(that);
  const locales$ = createOrReturnObservable(locales);
  const options$ = createOrReturnObservable(options);
  return (source) =>
    source.pipe(
      withLatestFrom(that$, locales$, options$),
      map(([value, thatValue, localeValue, optionValue]) =>
        new Intl.Collator(localeValue, optionValue).compare(value, thatValue),
      ),
    );
}
