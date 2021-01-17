/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, Subscriber } from 'rxjs';
import { isPromise } from 'rxjs/internal-compatibility';
import { map, switchMap } from 'rxjs/operators';
import { isArrayOrSet } from '../utils/array-set';
import { ArrayOrSet } from '../types/array-set';

/**
 * Returns an Observable that emits strings from any an argument list of strings or  supported Observable, Promise or
 * Array-like source
 *
 * @category String Observables
 *
 * @remarks This operator is a type-safe {@link https://rxjs.dev/api/index/function/from|from} and will emit only
 * strings, also unlike `from` a single string is not converted into an array-like.
 *
 * @param args Argument list, Observable input, Promise or Array of strings
 *
 * @example
 * Return a reversed string from an argument list of strings
 * ```ts
 * fromString('RxJS', 'Ninja').pipe(reverse()).subscribe();
 * ```
 * Output: `'SJxR', 'ajniN'`
 *
 * @example
 * Return a reversed string from an array list of strings
 * ```ts
 * fromString(['RxJS', 'Ninja']).pipe(reverse()).subscribe();
 * ```
 * Output: `'SJxR', 'ajniN'`
 *
 * @example
 * Return a reversed string from an Observable array list of strings
 * ```ts
 * fromString(of(['RxJS', 'Ninja'])).pipe(reverse()).subscribe();
 * ```
 * Output: `'SJxR', 'ajniN'`
 *
 * @returns Observable that emits a string
 */

export function fromString<
  A extends
    | ObservableInput<ArrayOrSet<string> | string>
    | PromiseLike<ArrayOrSet<string> | string>
    | ArrayOrSet<string>
    | string
>(...args: A[]): Observable<string> {
  if (isObservable(args[0])) {
    return ((args[0] as unknown) as Observable<ArrayOrSet<string> | string>).pipe(
      map((value) => (isArrayOrSet(value) ? [...value] : [value]) as string[]),
      switchMap((value) => {
        return new Observable<string>((subscriber: Subscriber<unknown>): void => {
          for (let i = 0; i < value.length; i++) {
            subscriber.next(value[i]);
          }
          subscriber.complete();
        });
      }),
    );
  } else if (isPromise(args[0])) {
    return new Observable<string>((subscriber: Subscriber<unknown>): void => {
      function callSubscriber(value: ArrayOrSet<string> | string) {
        /* istanbul ignore next-line */
        if (!subscriber.closed) {
          const output = isArrayOrSet(value) ? [...value] : [value];
          for (let i = 0; i < output.length; i++) {
            subscriber.next(output[i]);
          }
          subscriber.complete();
        }
      }

      ((args[0] as never) as Promise<ArrayOrSet<string> | string>).then(
        (value) => callSubscriber(value),
        (err) => subscriber.error(err),
      );
    });
  } else {
    const value = isArrayOrSet(args[0]) ? [...(args[0] as string[])] : ([...args] as string[]);

    return new Observable<string>((subscriber: Subscriber<unknown>): void => {
      for (let i = 0; i < value.length; i++) {
        subscriber.next(value[i]);
      }
      subscriber.complete();
    });
  }
}
