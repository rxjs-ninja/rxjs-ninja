/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPromise } from 'rxjs/internal-compatibility';
import { ArrayOrSet } from '../types/array-set';
import { isArrayOrSet } from '../utils/array-set';

/**
 * Returns an Observable that emits a string made from code points using String.fromCodePoint
 *
 * @remarks This operator will emit a single string for all input passed including arrays
 *
 * @category String Observables
 *
 * @param args Observable input, Promise, Array or argument list of code points
 *
 * @example
 * Return a string from code points arguments
 * ```ts
 * fromCodePoint(9731, 9733, 9842).subscribe();
 * ```
 * Output: `☃★♲`
 *
 * @example
 * Return a string from code points array
 * ```ts
 * fromCodePoint([9731, 9733, 9842]).subscribe();
 * ```
 * Output: `☃★♲`
 *
 * @example
 * Return a string from code points Observable
 * ```ts
 * fromCodePoint(of([9731, 9733, 9842]).subscribe();
 * ```
 * Output: `☃★♲`
 *
 * @returns Observable that emits a string
 */
export function fromCodePoint<
  A extends
    | ObservableInput<ArrayOrSet<number> | number>
    | PromiseLike<ArrayOrSet<number> | number>
    | ArrayOrSet<number>
    | number
>(...args: A[]): Observable<string> {
  if (isObservable(args[0])) {
    return ((args[0] as unknown) as Observable<ArrayOrSet<number> | number>).pipe(
      map((value) => (isArrayOrSet(value) ? [...value] : [value]) as number[]),
      map((value) => String.fromCodePoint(...value)),
    );
  } else if (isPromise(args[0])) {
    return new Observable<string>((subscriber: Subscriber<unknown>): void => {
      function callSubscriber(value: ArrayOrSet<number> | number) {
        /* istanbul ignore next-line */
        if (!subscriber.closed) {
          const output = isArrayOrSet(value) ? [...value] : [value];
          subscriber.next(String.fromCodePoint(...output));
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
      subscriber.next(String.fromCodePoint(...value));
      subscriber.complete();
    });
  }
}
