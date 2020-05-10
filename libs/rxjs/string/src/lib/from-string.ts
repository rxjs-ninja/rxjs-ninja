/**
 * @packageDocumentation
 * @module string
 */
import { Observable, SchedulerLike } from 'rxjs';
import { scheduleSingleOrArrayString, subscribeToSingleOrArrayString } from '../utils/from-value';

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
export function fromString(input: string | string[], scheduler?: SchedulerLike) {
  if (scheduler) {
    return scheduleSingleOrArrayString(input, scheduler);
  }
  return new Observable<string>(subscribeToSingleOrArrayString(input));
}
