/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `toUpperCase` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a string changed to all upper case characters
 *
 * This operator is based on both [String.prototype.toLocaleUpperCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase)
 * rather than [toUpperCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) as this provides support
 * for localisation of string
 *
 * @param locales Optional locales to pass for string formatting
 *
 * @example
 * ```ts
 * fromString('apple')
 *  .pipe(toUpperCase())
 *  subscribe(); // 'APPLE'
 * ```
 *
 * @example
 * ```ts
 * fromString('äpfel')
 *  .pipe(toUpperCase('de-DE'))
 *  subscribe(); // 'ÄPFEL'
 * ```
 *
 * @returns String that is converted to upper case with passed locale
 * @category String Modify
 */
export function toUpperCase(locales?: string | string[]): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.toLocaleUpperCase(locales)));
}
