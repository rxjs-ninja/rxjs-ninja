/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `toLowerCase` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a string changed to all lower case characters
 *
 * This operator is based on both [String.prototype.toLocaleLowerCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase)
 * rather than [toLowerCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) as this provides support
 * for localisation of string
 *
 * @param locales Optional locales to pass for string formatting
 *
 * @example
 * ```ts
 * fromString('APPLE')
 *  .pipe(toLowerCase())
 *  subscribe(); // 'apple'
 * ```
 *
 * @example
 * ```ts
 * fromString('ÄPFEL')
 *  .pipe(toLowerCase('de-DE'))
 *  subscribe(); // 'äpfel'
 * ```
 *
 * @returns String that is converted to lower case with passed locale
 * @category String Modify
 */
export function toLowerCase(locales?: string | string[]): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.toLocaleLowerCase(locales)));
}
