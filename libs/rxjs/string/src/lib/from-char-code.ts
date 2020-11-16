/**
 * @packageDocumentation
 * @module string
 */
import { Observable } from 'rxjs';
import { subscribeToCharCode } from '../utils/from-char-code.utils';

/**
 * The `fromCharCode` operator is used to create an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * from a number or number array of code points using
 * [String.fromCharCode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
 *
 * Unlike the [from](https://rxjs.dev/api/index/function/from) operator when passing an array of numbers to
 * this operator it will generate a single string from the passed arguments
 *
 * @param input A char code number to turn into a string
 *
 * @example
 * ```ts
 * fromCharCode(65).subscribe(console.log) // 'A'
 * ```
 *
 * @example
 * ```ts
 * fromCharCode([65, 66, 67, 68]).subscribe(console.log) // 'ABCD'
 * ```
 *
 * @returns String from an an array of character codes
 * @category RxJS String Creation
 */
export function fromCharCode(input: number | number[]): Observable<string> {
  return new Observable<string>(subscribeToCharCode(input));
}
