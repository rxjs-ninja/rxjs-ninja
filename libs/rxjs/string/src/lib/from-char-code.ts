/**
 * @packageDocumentation
 * @module string
 */
import { Observable, SchedulerLike } from 'rxjs';
import { scheduleCharCode, subscribeToCharCode } from '../utils/from-char-code.utils';

/**
 * The `fromCharCode` operator is used to create an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * from a number or number array of code points using [String.fromCharCode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
 *
 * @param input A number or array of numbers to convert to a string
 * @param scheduler Optional [SchedulerLike](https://rxjs-dev.firebaseapp.com/api/index/interface/SchedulerLike)
 *
 * @example
 * ```ts
 * fromCharCode([65, 66, 67, 68]).subscribe(console.log) // 'ABCD'
 * ```
 *
 * @remarks
 * Unlike the [from](https://rxjs-dev.firebaseapp.com/api/index/function/from) operator when passing an array of numbers to this operator it will generate a single string
 *
 * @returns String from an character code or array of character codes
 * @category RxJS String Creation
 */
export function fromCharCode(input: number | number[], scheduler?: SchedulerLike) {
  if (scheduler) {
    return scheduleCharCode(input, scheduler);
  }
  return new Observable<string>(subscribeToCharCode(input));
}
