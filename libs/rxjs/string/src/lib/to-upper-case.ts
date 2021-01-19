/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a string where the source string is passed through String.toLocaleLowerCase
 *
 * @category Modify
 *
 * @param locales Optional locales to pass for string formatting
 *
 * @example
 * Returns an upper case string
 * ```ts
 * of('apple').pipe(toUpperCase()).subscribe();
 * ```
 * Output: `'APPLE'`
 *
 * @example
 * Returns an lower case string with locale
 * ```ts
 * of('äpfel').pipe(toUpperCase('de-DE')).subscribe();
 * ```
 * Output: `'ÄPFEL'`
 *
 * @returns Observable that emits a lower case string
 */
export function toUpperCase(
  locales?: Subscribable<Iterable<string> | string> | Iterable<string> | string,
): MonoTypeOperatorFunction<string> {
  const locales$ = createOrReturnObservable(locales);
  return (source) =>
    source.pipe(
      withLatestFrom(locales$),
      map(([value, localesValue]) =>
        value.toLocaleUpperCase(!localesValue || typeof localesValue === 'string' ? localesValue : [...localesValue]),
      ),
    );
}
