/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string where the source string is passed through String.toLocaleLowerCase
 *
 * @category String Modify
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
export function toLowerCase(locales?: string | string[]): MonoTypeOperatorFunction<string> {
  return (source) => source.pipe(map((value) => value.toLocaleLowerCase(locales)));
}
