/**
 * @packageDocumentation
 * @module string
 */
import { Observable, SchedulerLike } from 'rxjs';
import { scheduleSingleOrArrayString, subscribeToSingleOrArrayString } from '../utils/from-string.utils';

/**
 * The `fromString` operator is used to create an [Observable](https://rxjs.dev/api/index/class/Observable) string from a passed
 * string value or array of string values.
 *
 * @param input The string to create the Observable source from
 * @param scheduler Optional [SchedulerLike](https://rxjs-dev.firebaseapp.com/api/index/interface/SchedulerLike)
 *
 * @example
 * ```ts
 * fromString('Foobar')..pipe(reverse()).subscribe(console.log) // 'rabooF'
 * ```
 *
 * @returns String from the original string, made Observable
 * @category RxJS String Creation
 */
function fromString(input: string, scheduler?: SchedulerLike): Observable<string>;
/**
 * When using fromString with an array, this acts like the [from](https://rxjs-dev.firebaseapp.com/api/index/function/from)
 * operator and emits for each array item
 *
 * @param input Array of strings to create Observable values from
 * @param scheduler Optional [SchedulerLike](https://rxjs-dev.firebaseapp.com/api/index/interface/SchedulerLike)
 *
 * @example
 * ```ts
 * fromString(['Foo', 'Bar'])..pipe(reverse()).subscribe(console.log) // ['ooF', 'raB']
 * ```
 *
 * @returns String from the original string, made Observable
 * @category RxJS String Creation
 */
function fromString(input: string[], scheduler?: SchedulerLike): Observable<string>;
function fromString(input: string | string[], scheduler?: SchedulerLike): Observable<string> {
  if (scheduler) {
    return scheduleSingleOrArrayString(input, scheduler);
  }
  return new Observable<string>(subscribeToSingleOrArrayString(input));
}

export { fromString };
