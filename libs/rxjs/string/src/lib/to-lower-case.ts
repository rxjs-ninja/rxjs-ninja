/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `toLowerCase` operator can be used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * value and returns a string changed to all lower case characters
 *
 * This operator is based on both [String.prototype.toLocaleLowerCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase)
 * rather than [toLowerCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) as this provides support
 * for localisation of string
 *
 * @example
 * ```ts
 * fromString('APPLE')
 *  .pipe(toLowerCase())
 *  .subscribe(console.log) // 'apple'
 * ```
 *
 * @returns String that is converted to lower case
 * @category RxJS String Formatting
 */
function toLowerCase(): MonoTypeOperatorFunction<string>;
/**
 *
 * @param locales Optional locales to pass for string formatting
 *
 * @example
 * ```ts
 * fromString('ÄPFEL')
 *  .pipe(toLowerCase('de-DE'))
 *  .subscribe(console.log) // 'äpfel'
 * ```
 *
 * @returns String that is converted to lower case with passed locale
 * @category RxJS String Formatting
 */
function toLowerCase(locales: string | string[]): MonoTypeOperatorFunction<string>;
function toLowerCase(locales?: string | string[]): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.toLocaleLowerCase(locales)));
}

export { toLowerCase };
