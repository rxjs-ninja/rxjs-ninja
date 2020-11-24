/**
 * @packageDocumentation
 * @module String
 */
import { Observable } from 'rxjs';
import { FormType } from '../types/normalize';
import { subscribeToSingleOrArrayUnicode } from '../utils/from-unicode.utils';

/**
 * Takes a string containing the Unicode Normalization Form and uses [String.prototype.normalize](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
 * to convert it to a string with unicode characters
 *
 * @param input A string of unicode characters
 * @param form The Unicode Normalization Form to decode the string with
 *
 * @example
 * ```ts
 * fromUnicode('\u0041\u006d\u00e9\u006c\u0069\u0065')
 *  .subscribe(console.log) // Amélie
 * ```
 *
 * @example
 * ```ts
 * fromUnicode(['\u0041\u006d\u00e9\u006c\u0069\u0065', '\u0041\u006d\u0065\u0301\u006c\u0069\u0065'])
 *  .subscribe(console.log) // ['Amélie', 'Amélie']
 * ```
 *
 * @returns String from the decoded unicode string
 * @category RxJS String Creation
 */
export function fromUnicode(input: string | string[], form?: FormType): Observable<string> {
  return new Observable<string>(subscribeToSingleOrArrayUnicode(input, form));
}
