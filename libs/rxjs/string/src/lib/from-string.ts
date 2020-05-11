/**
 * @packageDocumentation
 * @module string
 */
import { Observable, SchedulerLike } from 'rxjs';
import { scheduleSingleOrArrayString, subscribeToSingleOrArrayString } from '../utils/from-string.utils';

/**
 * The `fromString` operator is used to create an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string from a passed
 * string value or array of string values
 *
 * @param input the string or string array to create an Observable source from
 * @param scheduler Optional [SchedulerLike](https://rxjs-dev.firebaseapp.com/api/index/interface/SchedulerLike)
 *
 * @example
 * ```ts
 * fromString('Foobar')..pipe(reverse()).subscribe(console.log) // 'rabooF'
 * ```
 *
 * @example
 * ```ts
 * fromString(['Foo', 'Bar'])..pipe(reverse()).subscribe(console.log) // ['ooF', 'raB']
 * ```
 *
 * @remarks
 * When using `fromString` with an array, this acts like the [from](https://rxjs-dev.firebaseapp.com/api/index/function/from)
 * operator and emits each array item as a separate string
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
