/**
 * @packageDocumentation
 * @module Boolean
 */
import { Observable, Subscriber } from 'rxjs';

/**
 * Returns an Observable that emits boolean values from passed parameters or an array of values
 **
 * @typeParam T The type or types to be used to create boolean values from
 *
 * @param args Boolean input to create an Observable<boolean> from
 *
 * @example
 * ```ts
 * fromBoolean(true)
 *  .pipe(map(val => !val))
 *  .subscribe() // false
 * ```
 *
 * @example
 * ```ts
 * fromBoolean([false, true, false, true])
 *  .pipe(map(val => !val))
 *  .subscribe() // [true, false, true, false]
 * ```
 *
 * @returns Boolean value from the initial parameters
 * @category Boolean Observables
 */
export function fromBoolean<T extends unknown | unknown[]>(...args: T[]): Observable<boolean> {
  let value = Array.isArray(args[0]) ? (args[0] as unknown[]) : ([...args] as unknown[]);
  value = value.map(Boolean);

  return new Observable<boolean>((subscriber: Subscriber<unknown>): void => {
    for (let i = 0; i < value.length; i++) {
      subscriber.next(value[i]);
    }
    subscriber.complete();
  });
}
