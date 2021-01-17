/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPromise } from 'rxjs/internal-compatibility';
import { isArrayOrSet } from '../utils/array-set';
import { ArrayOrSet } from '../types/array-set';

/**
 * Returns an Observable that emits a string made from character codes using String.fromCharCode
 *
 * @remarks This operator will emit a single string for all input passed including arrays
 *
 * @see The [[mapCharCode]] operator can be used to map an Observable source of char codes to strings
 *
 * @category String Observables
 *
 * @param args Observable input, Promise, Array or argument list of character codes
 *
 * @example
 * Return a string from character code arguments
 * ```ts
 * fromCharCode(82, 120, 74, 83).subscribe();
 * ```
 * Output: `RxJS`
 *
 * @example
 * Return a string from character code array
 * ```ts
 * fromCharCode([82, 120, 74, 83]).subscribe();
 * ```
 * Output: `RxJS`
 *
 * @example
 * Return a string from character code Observable
 * ```ts
 * fromCharCode(of([82, 120, 74, 83]).subscribe();
 * ```
 * Output: `RxJS`
 *
 * @returns Observable that emits a string
 */

export function fromCharCode<
  A extends
    | ObservableInput<ArrayOrSet<number> | number>
    | PromiseLike<ArrayOrSet<number> | number>
    | ArrayOrSet<number>
    | number
>(...args: A[]): Observable<string> {
  if (isObservable(args[0])) {
    return ((args[0] as unknown) as Observable<ArrayOrSet<number> | number>).pipe(
      map((value) => (isArrayOrSet(value) ? [...value] : [value]) as number[]),
      map((value) => String.fromCharCode(...value)),
    );
  } else if (isPromise(args[0])) {
    return new Observable<string>((subscriber: Subscriber<unknown>): void => {
      function callSubscriber(value: ArrayOrSet<number> | number) {
        /* istanbul ignore next-line */
        if (!subscriber.closed) {
          const output = isArrayOrSet(value) ? [...value] : [value];
          subscriber.next(String.fromCharCode(...output));
          subscriber.complete();
        }
      }

      ((args[0] as never) as Promise<ArrayOrSet<number> | number>).then(
        (value) => callSubscriber(value),
        (err) => subscriber.error(err),
      );
    });
  } else {
    const value = isArrayOrSet(args[0]) ? [...(args[0] as number[])] : ([...args] as number[]);
    return new Observable<string>((subscriber: Subscriber<unknown>): void => {
      subscriber.next(String.fromCharCode(...value));
      subscriber.complete();
    });
  }
}
