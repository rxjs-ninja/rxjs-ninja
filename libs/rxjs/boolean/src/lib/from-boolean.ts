/**
 * @packageDocumentation
 * @module boolean
 */
import { Observable } from 'rxjs';
import { subscribeToSingleOrArrayBoolean } from '../utils/from-boolean.utils';

/**
 * The `fromBoolean` operator is used to create an [Observable](https://rxjs.dev/api/index/class/Observable) boolean from a passed
 * value or array of values. The operator can be overloaded with types to be used with strings, number or mixed sources
 *
 * Using `fromBoolean` with an array of booleans is the same as using the [from](https://rxjs.dev/api/index/function/from) operator from RxJS
 *
 * @typeParam T The type or types to be used to create boolean values from
 * @default boolean
 *
 * @param args Boolean input to create an Observable<boolean> from
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
 * fromBoolean([false, true, false, true])
 *  .pipe(map(val => !val))
 *  .subscribe(console.log) // [true, false, true, false]
 * ```
 *
 *
 * @returns Boolean value from the initial parameters
 * @category RxJS Boolean Observables
 */
export function fromBoolean<T extends boolean | boolean[]>(...args: T[]): Observable<boolean> {
  return new Observable<boolean>(subscribeToSingleOrArrayBoolean<T>(args[0]));
}
