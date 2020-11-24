/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormType } from '../types/normalize';

/**
 * Takes a string containing the Unicode Normalization Form and uses [String.prototype.normalize](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
 * to convert it to a string with unicode characters
 *
 * @param form The Unicode Normalization Form to decode the string with
 *
 * @example
 * ```ts
 * fromString('\u0041\u006d\u00e9\u006c\u0069\u0065')
 *  .pipe(normalize(FormType.NFC))
 *  .subscribe(console.log) // Amélie
 * ```
 *
 * @returns String from the decoded unicode string
 * @category RxJS String Map
 */
export function normalize(form?: FormType): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.normalize(form)));
}
