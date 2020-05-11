/**
 * @packageDocumentation
 * @module string
 */
import { Observable, SchedulerLike } from 'rxjs';
import { scheduleCodePoint, subscribeToCodePoint } from '../utils/from-code-point.utils';

/**
 * The `fromCodePoint` operator is used to create an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * from a number or number array of code points using [String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint)
 *
 * @param input A number or array of numbers to convert to a string
 * @param scheduler Optional [SchedulerLike](https://rxjs-dev.firebaseapp.com/api/index/interface/SchedulerLike)
 *
 * @example
 * ```ts
 * fromCodePoint([9731, 9733, 9842]).subscribe(console.log) // '☃★♲'
 * ```
 *
 * @remarks
 * Unlike the [from](https://rxjs-dev.firebaseapp.com/api/index/function/from) operator when passing an array of numbers to this operator it will generate a single string
 *
 * @returns String from an character code or array of character codes
 * @category RxJS String Creation
 */
export function fromCodePoint(input: number | number[], scheduler?: SchedulerLike) {
  if (scheduler) {
    return scheduleCodePoint(input, scheduler);
  }
  return new Observable<string>(subscribeToCodePoint(input));
}
