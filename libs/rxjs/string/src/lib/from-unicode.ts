/**
 * @packageDocumentation
 * @module string
 */
import { Observable, SchedulerLike } from 'rxjs';
import { FormType } from '../types/normalize';
import { scheduleSingleOrArrayUnicode, subscribeToSingleOrArrayUnicode } from '../utils/from-unicode.utils';

/**
 * Takes a string containing the Unicode Normalization Form and uses [String.prototype.normalize](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
 * to convert it to a string with unicode characters
 *
 * @param input A string of unicode characters
 * @param form The Unicode Normalization Form to decode the string with
 * @param scheduler Optional [SchedulerLike](https://rxjs.dev/api/index/interface/SchedulerLike)
 *
 * @example
 * ```ts
 * fromUnicode('\u0041\u006d\u00e9\u006c\u0069\u0065')
 *  .subscribe(console.log) // Amélie
 * ```
 *
 * @returns String from the decoded unicode string
 * @category RxJS String Creation
 */
function fromUnicode(input: string, form?: FormType, scheduler?: SchedulerLike): Observable<string>;
/**
 * @param input An array of strings of unicode characters
 * @param form The Unicode Normalization Form to decode the string with
 * @param scheduler Optional [SchedulerLike](https://rxjs.dev/api/index/interface/SchedulerLike)
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
function fromUnicode(input: string[], form?: FormType, scheduler?: SchedulerLike): Observable<string>;
function fromUnicode(input: string | string[], form?: FormType, scheduler?: SchedulerLike): Observable<string> {
  if (scheduler) {
    return scheduleSingleOrArrayUnicode(input, form, scheduler);
  }
  return new Observable<string>(subscribeToSingleOrArrayUnicode(input, form));
}

export { fromUnicode };
