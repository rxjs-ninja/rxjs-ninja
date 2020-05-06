/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `toLowerCase` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} string
 * value and returns a string changed to all lower case characters
 *
 * @param locales Optional locales to pass for string formatting
 *
 * @remarks
 * This operator is based on both [String.prototype.toLocaleLowerCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase)
 * rather than [toLowerCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) as this provides support
 * for localisation of string
 *
 * @example
 * ```ts
 * from(['ÄPFEL'])
 *  .pipe(toLowerCase('de-DE'))
 *  .subscribe(....) // ['äpfel']
 * ```
 *
 * @returns String that is converted to lower case
 * @category RxJS String Formatting
 */
export function toLowerCase(locales?: string | string[]): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.toLocaleLowerCase(locales)));
}
