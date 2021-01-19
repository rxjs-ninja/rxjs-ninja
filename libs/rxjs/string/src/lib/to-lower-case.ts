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
 * Returns an lower case string
 * ```ts
 * of('APPLE').pipe(toLowerCase()).subscribe();
 * ```
 * Output: `'apple'`
 *
 * @example
 *  * Returns an lower case string with locale
 * ```ts
 * of('ÄPFEL').pipe(toLowerCase('de-DE')).subscribe();
 * ```
 * Output: `'äpfel'`
 *
 * @returns Observable that emits a lower case string
 */
export function toLowerCase(
  locales?: Subscribable<Iterable<string> | string> | Iterable<string> | string,
): MonoTypeOperatorFunction<string> {
  const locales$ = createOrReturnObservable(locales);
  return (source) =>
    source.pipe(
      withLatestFrom(locales$),
      map(([value, localesValue]) =>
        value.toLocaleLowerCase(!localesValue || typeof localesValue === 'string' ? localesValue : [...localesValue]),
      ),
    );
}
