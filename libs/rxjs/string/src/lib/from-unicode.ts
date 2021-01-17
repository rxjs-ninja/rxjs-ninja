/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, Subscriber } from 'rxjs';
import { FormType } from '../types/normalize';
import { map, switchMap } from 'rxjs/operators';
import { isPromise } from 'rxjs/internal-compatibility';
import { ArrayOrSet } from '@rxjs-ninja/rxjs-array';
import { isArrayOrSet } from '../utils/array-set';

/**
 * Returns an Observable that emits a string made from a source unicode string using String.normalize
 *
 * @category String Observables
 *
 * @remarks This operator is a type-safe {@link https://rxjs.dev/api/index/function/from|from} and will emit only
 * strings, also unlike `from` a single string is not converted into an array-like.
 *
 * @param input A string or array of string unicode characters
 * @param form The Unicode Normalization Form to decode the string with
 *
 * @example
 * Returns a string from Unicode characters
 * ```ts
 * fromUnicode('\u0041\u006d\u00e9\u006c\u0069\u0065').subscribe();
 * ```
 * Output: `Amélie`
 *
 * @returns Observable that emits a string
 */

export function fromUnicode<
  A extends
    | ObservableInput<ArrayOrSet<string> | string>
    | PromiseLike<ArrayOrSet<string> | string>
    | ArrayOrSet<string>
    | string
>(input: A, form?: FormType): Observable<string> {
  if (isObservable(input)) {
    return ((input as unknown) as Observable<ArrayOrSet<string> | string>).pipe(
      map((value) => (isArrayOrSet(value) ? [...value] : [value]) as string[]),
      switchMap((value) => {
        return new Observable<string>((subscriber: Subscriber<unknown>): void => {
          for (let i = 0; i < value.length; i++) {
            subscriber.next(value[i].normalize(form));
          }
          subscriber.complete();
        });
      }),
    );
  } else if (isPromise(input)) {
    return new Observable<string>((subscriber: Subscriber<unknown>): void => {
      function callSubscriber(value: ArrayOrSet<string> | string) {
        /* istanbul ignore next-line */
        if (!subscriber.closed) {
          const output = isArrayOrSet(value) ? [...value] : [value];
          for (let i = 0; i < output.length; i++) {
            subscriber.next(output[i].normalize(form));
          }
          subscriber.complete();
        }
      }

      ((input as never) as Promise<ArrayOrSet<string> | string>).then(
        (value) => callSubscriber(value),
        (err) => subscriber.error(err),
      );
    });
  } else {
    const value = Array.isArray(input) ? (input as string[]) : ([input] as string[]);

    return new Observable<string>((subscriber: Subscriber<unknown>): void => {
      for (let i = 0; i < value.length; i++) {
        subscriber.next(value[i].normalize(form));
      }
      subscriber.complete();
    });
  }
}

//
//
// export function fromUnicode<T extends ObservableInput<string[]> | PromiseLike<string[]> | string | string[]>(
//   input: T,
//   form?: FormType,
// ): Observable<string> {
//   if (isObservable(input)) {
//     return ((input as never) as Observable<number[]>).pipe(map((value) => String.fromCodePoint(...value)));
//   } else if (isPromise(input)) {
//     return new Observable<string>((subscriber: Subscriber<unknown>): void => {
//       ((input as never) as Promise<number[]>).then(
//         (value) => {
//           if (!subscriber.closed) {
//             subscriber.next(String.fromCodePoint(...value));
//             subscriber.complete();
//           }
//         },
//         (err) => subscriber.error(err),
//       );
//     });
//   } else {
//     const value = Array.isArray(input) ? input : [input];
//     return new Observable<string>((subscriber: Subscriber<string>): void => {
//       for (let i = 0; i < value.length; i++) {
//         subscriber.next(value[i].normalize(form));
//       }
//       subscriber.complete();
//     });
//   }
// }
