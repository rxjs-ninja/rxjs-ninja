/**
 * @packageDocumentation
 * @module Boolean
 */
import { isObservable, Observable, ObservableInput, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPromise } from 'rxjs/internal-compatibility';

/**
 * Returns an Observable that emits boolean values from passed source of values.
 *
 * @category Boolean Observables
 *
 * @typeParam T The type or types to be used to create boolean values from
 *
 * @param args Input values to create the Observable source from
 *
 * @example
 * Create an Observable that emits a single boolean value from a string, flip the value
 * ```ts
 * fromBoolean('Hello RxJS Ninja').pipe(flip()).subscribe();
 * ```
 * Output: `false`
 *
 * @example
 * Create an Observable that emits a single boolean from an array of values
 * ```ts
 * fromBoolean(['', 'Hello', 'RxJS', '']).subscribe();
 * ```
 * Output: `false, true, true, false`;
 *
 * @returns Observable that emits boolean values of the source value

 */
export function fromBoolean<T extends ObservableInput<unknown> | PromiseLike<unknown> | unknown | unknown[]>(
  ...args: T[]
): Observable<boolean> {
  if (isObservable(args[0])) {
    return (args[0] as Observable<T>).pipe(map(Boolean));
  } else if (isPromise(args[0])) {
    return new Observable<boolean>((subscriber: Subscriber<unknown>): void => {
      (args[0] as Promise<T>).then(
        (value) => {
          if (!subscriber.closed) {
            subscriber.next(value);
            subscriber.complete();
          }
        },
        (err) => subscriber.error(err),
      );
    });
  } else {
    let value = Array.isArray(args[0]) ? (args[0] as unknown[]) : ([...args] as unknown[]);
    value = value.map(Boolean);

    return new Observable<boolean>((subscriber: Subscriber<unknown>): void => {
      for (let i = 0; i < value.length; i++) {
        subscriber.next(value[i]);
      }
      subscriber.complete();
    });
  }
}
