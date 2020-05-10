/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `toUpperCase` operator can be used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * value and returns a string changed to all upper case characters
 *
 * @param locales Optional locales to pass for string formatting
 *
 * @remarks
 * This operator is based on both [String.prototype.toLocaleUpperCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase)
 * rather than [toUpperCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) as this provides support
 * for localisation of string
 *
 * @example
 * ```ts
 * from(['äpfel'])
 *  .pipe(toUpperCase('de-DE'))
 *  .subscribe(....) // ['ÄPFEL']
 * ```
 *
 * @returns String that is converted to upper case
 * @category RxJS String Formatting
 */
export function toUpperCase(locales?: string | string[]): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.toLocaleUpperCase(locales)));
}
