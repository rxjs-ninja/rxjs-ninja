/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string where the source string is passed through String.toLocaleLowerCase
 *
 * @category String Modify
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
export function toUpperCase(locales?: string | string[]): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.toLocaleUpperCase(locales)));
}
