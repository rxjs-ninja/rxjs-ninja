/**
 * @packageDocumentation
 * @module string
 */
import { Observable, SchedulerLike } from 'rxjs';
import { scheduleString, subscribeToString } from '../utils/string';

/**
 * The `fromString` operator is used to create an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string from a passed
 * string value
 *
 * @example
 * ```ts
 * fromString('Foobar')..pipe(reverse()).subscribe(...) // 'rabooF'
 * ```
 *
 * @returns String from an array of character codes
 * @category RxJS String Creation
 */
export function fromString(input: string, scheduler?: SchedulerLike) {
  if (!input) {
    throw new Error('Input cannot be null');
  }
  if (!scheduler) {
    return new Observable<string>(subscribeToString(input));
  } else {
    return scheduleString(input, scheduler);
  }
}
