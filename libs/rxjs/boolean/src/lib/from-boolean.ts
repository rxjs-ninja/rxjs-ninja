/**
 * @packageDocumentation
 * @module Boolean
 */
import { isObservable, Observable, ObservableInput, Subscriber } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { isPromise } from 'rxjs/internal-compatibility';
import { ArrayOrSet } from '../types/array-set';
import { isArrayOrSet } from '../utils/array-set';

/**
 * Returns an Observable that emits boolean values from passed source of values.
 *
 * @category Create
 *
 * @typeParam T Type of the value from the source Observable
 * @typeParam A Input types accepted to convert to boolean
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
export function fromBoolean<
  T extends unknown,
  A extends ObservableInput<ArrayOrSet<T> | T> | PromiseLike<ArrayOrSet<T> | T> | ArrayOrSet<T> | T
>(...args: A[]): Observable<boolean> {
  if (isObservable(args[0])) {
    return (args[0] as Observable<ArrayOrSet<T> | T>).pipe(
      map((value) => (isArrayOrSet(value) ? [...value] : [value])),
      map((value) => value.map(Boolean)),
      switchMap((value) => {
        return new Observable<boolean>((subscriber: Subscriber<unknown>): void => {
          for (let i = 0; i < value.length; i++) {
            subscriber.next(value[i]);
          }
          subscriber.complete();
        });
      }),
    );
  } else if (isPromise(args[0])) {
    return new Observable<boolean>((subscriber: Subscriber<unknown>): void => {
      (args[0] as Promise<T>).then(
        (value) => {
          /* istanbul ignore next-line */
          if (!subscriber.closed) {
            subscriber.next(value);
            subscriber.complete();
          }
        },
        (err) => subscriber.error(err),
      );
    });
  } else {
    const value = (Array.isArray(args[0]) ? (args[0] as T[]) : ([...args] as T[])).map(Boolean);
    return new Observable<boolean>((subscriber: Subscriber<unknown>): void => {
      for (let i = 0; i < value.length; i++) {
        subscriber.next(value[i]);
      }
      subscriber.complete();
    });
  }
}
