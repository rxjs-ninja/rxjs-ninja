/**
 * @packageDocumentation
 * @module Boolean
 */
import { Observable, Subscribable } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';
import { isArrayOrSet } from '../utils/array-set';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits boolean values from passed source of values.
 *
 * @category Create
 *
 * @typeParam T Type of the value from the source Observable
 *
 * @param input Input values to create the Observable source from
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
 * @returns Observable that emits the `Boolean` value of the source value

 */
export function fromBoolean<T extends unknown>(
  input: Subscribable<Iterable<T> | T> | Iterable<T> | T,
): Observable<boolean> {
  return new Observable<boolean>((subscriber) => {
    createOrReturnObservable(input)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map<Iterable<T> | T, boolean[]>((value) => (isArrayOrSet(value) ? [...value] : [value]).map(Boolean)),
        tap((value) => {
          for (let i = 0; i < value.length; i++) {
            subscriber.next(value[i]);
          }
        }),
        finalize(() => !subscriber.closed && subscriber.complete()),
      )
      .subscribe();

    /* istanbul ignore next-line */
    return () => !subscriber.closed && subscriber.complete();
  });
}
