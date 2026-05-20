/**
 * @packageDocumentation
 * @module String
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable number from `String.prototype.localeCompare` against a comparison string.
 *
 * @category Query
 *
 * @param that String to compare against
 * @param locales Optional locales argument
 * @param options Optional `Intl.Collator` options
 *
 * @returns Observable that emits the compare result
 */
export function localeCompare(
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
        value.localeCompare(thatValue, localeValue, optionValue),
      ),
    );
}
