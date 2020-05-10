/**
 * @packageDocumentation
 * @module number
 */
import { Observable, SchedulerLike } from 'rxjs';
import { scheduleNumber, subscribeToNumber } from '../utils/number';

/**
 * The `fromNumber` operator is used to create an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} number from a passed
 * number value
 *
 * @example
 * ```ts
 * fromNumber(6 * 7)..subscribe(...) // 42
 * ```
 *
 * @returns Observable number from passed number
 * @category RxJS Number Creation
 */
export function fromNumber(input: number, scheduler?: SchedulerLike) {
  if (!input) {
    throw new Error('Input cannot be null');
  }
  if (!scheduler) {
    return new Observable<number>(subscribeToNumber(input));
  } else {
    return scheduleNumber(input, scheduler);
  }
}
