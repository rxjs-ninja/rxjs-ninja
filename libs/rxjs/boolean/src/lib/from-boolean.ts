/**
 * @packageDocumentation
 * @module boolean
 */
import { Observable, SchedulerLike } from 'rxjs';
import { scheduleSingleOrArrayBoolean, subscribeToSingleOrArrayBoolean } from '../utils/from-boolean.utils';

/**
 * The `fromBoolean` operator is used to create an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) boolean from a passed
 * value or array of values. The operator can be overloaded with types to be used with strings, number or mixed sources
 *
 * @typeParam T The type or types to be used to create boolean values from
 * @default boolean
 *
 * @param input Boolean input to create an Observable<boolean> from
 * @param scheduler The [SchedulerLike](https://rxjs-dev.firebaseapp.com/api/index/interface/SchedulerLike) to use for scheduling the emission of values, and providing a notion of "time"
 *
 * @example
 * ```ts
 * fromBoolean(true)
 *  .pipe(map(val => !val))
 *  .subscribe(console.log) // false
 * ```
 *
 * @example
 * ```ts
 * fromBoolean<string>('')
 *  .subscribe(console.log) // false
 * ```
 *
 * @returns Boolean value from the initial parameters
 * @category RxJS Boolean Observables
 */
function fromBoolean<T = boolean>(input: T, scheduler?: SchedulerLike): Observable<boolean>;
/**
 * Using `fromBoolean` with an array of booleans is the same as using the [from](https://rxjs-dev.firebaseapp.com/api/index/function/from) operator from RxJS
 *
 * @typeParam T The type or types to be used to create boolean values from
 * @default boolean
 *
 * @param input Boolean Array input to create an Observable<boolean> from
 * @param scheduler The [SchedulerLike](https://rxjs-dev.firebaseapp.com/api/index/interface/SchedulerLike) to use for scheduling the emission of values, and providing a notion of "time"
 *
 * @example
 * ```ts
 * fromBoolean<string>(['', 'foo', '', 'bar'])
 *  .subscribe(console.log) // [false, true, false, true]
 * ```
 *
 * @example
 * ```ts
 * fromBoolean<string | number>([0, 1, '2.5'])
 *  .subscribe(console.log) // [false, true, true]
 * ```
 *
 * @returns Boolean value from the initial parameters
 * @category RxJS Boolean Observables
 */
function fromBoolean<T = boolean>(input: T[], scheduler?: SchedulerLike): Observable<boolean>;
function fromBoolean<T = boolean>(input: T | T[], scheduler?: SchedulerLike): Observable<boolean> {
  if (scheduler) {
    return scheduleSingleOrArrayBoolean<T>(input, scheduler);
  }
  return new Observable<boolean>(subscribeToSingleOrArrayBoolean<T>(input));
}

export { fromBoolean };
