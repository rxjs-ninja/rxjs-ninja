/**
 * @packageDocumentation
 * @module string
 */
import { Observable, SchedulerLike } from 'rxjs';
import { scheduleCodePoint, subscribeToCodePoint } from '../utils/code-point';

/**
 * The `fromCodePoint` operator is used to create an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * from a number array of code points
 *
 * @remarks
 * Based on [String.fromCharCode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
 * This operator takes an array of number values, if you want to only convert one character this still needs passed as an array
 *
 * @example
 * ```ts
 * fromCodePoint([9731, 9733, 9842]).subscribe(...) // '☃★♲'
 * ```
 *
 * @returns String from an array of character codes
 * @category RxJS String Creation
 */
export function fromCodePoint(input: number[], scheduler?: SchedulerLike) {
  if (!input) {
    throw new Error('Input cannot be null');
  }
  if (!scheduler) {
    return new Observable<string>(subscribeToCodePoint(input));
  } else {
    return scheduleCodePoint(input, scheduler);
  }
}
