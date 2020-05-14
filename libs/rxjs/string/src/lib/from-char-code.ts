/**
 * @packageDocumentation
 * @module string
 */
import { Observable, SchedulerLike } from 'rxjs';
import { scheduleCharCode, subscribeToCharCode } from '../utils/from-char-code.utils';

/**
 * The `fromCharCode` operator is used to create an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * from a number or number array of code points using
 * [String.fromCharCode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
 *
 * Unlike the [from](https://rxjs-dev.firebaseapp.com/api/index/function/from) operator when passing an array of numbers to
 * this operator it will generate a single string from the passed arguments
 *
 * @param input A char code number to turn into a string
 * @param scheduler Optional [SchedulerLike](https://rxjs-dev.firebaseapp.com/api/index/interface/SchedulerLike)
 *
 * @example
 * ```ts
 * fromCharCode(65).subscribe(console.log) // 'A'
 * ```
 *
 * @returns String from a character code
 * @category RxJS String Creation
 */
function fromCharCode(input: number, scheduler?: SchedulerLike): Observable<string>;
/**
 * @param input An array of char code numbers to turn into a string
 * @param scheduler Optional [SchedulerLike](https://rxjs-dev.firebaseapp.com/api/index/interface/SchedulerLike)
 *
 * @example
 * ```ts
 * fromCharCode([65, 66, 67, 68]).subscribe(console.log) // 'ABCD'
 * ```
 *
 * @returns String from an an array of character codes
 * @category RxJS String Creation
 */
function fromCharCode(input: number[], scheduler?: SchedulerLike): Observable<string>;
function fromCharCode(input: number | number[], scheduler?: SchedulerLike): Observable<string> {
  if (scheduler) {
    return scheduleCharCode(input, scheduler);
  }
  return new Observable<string>(subscribeToCharCode(input));
}

export { fromCharCode };
