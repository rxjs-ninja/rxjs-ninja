/**
 * @packageDocumentation
 * @module string
 */
import { Observable } from 'rxjs';
import { subscribeToCodePoint } from '../utils/from-code-point.utils';

/**
 * The `fromCodePoint` operator is used to create an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * from a number or number array of code points using
 * [String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint)
 *
 * Unlike the [from](https://rxjs.dev/api/index/function/from) operator when passing an array of numbers to
 * this operator it will generate a single string from the passed arguments
 *
 * @param input A code point number to turn into a string
 *
 * @example
 * ```ts
 * fromCharCode(9733).subscribe(console.log) // '★'
 * ```
 *
 * @returns String from a code point
 * @category RxJS String Creation
 */
function fromCodePoint(input: number): Observable<string>;
/**
 * @param input An array of code point numbers to turn into a string
 *
 * @example
 * ```ts
 * fromCharCode([9731, 9733, 9842]).subscribe(console.log) // '☃★♲'
 * ```
 *
 * @returns String from an an array of code points
 * @category RxJS String Creation
 */
function fromCodePoint(input: number[]): Observable<string>;
function fromCodePoint(input: number | number[]): Observable<string> {
  return new Observable<string>(subscribeToCodePoint(input));
}

export { fromCodePoint };
