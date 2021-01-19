/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, throwError } from 'rxjs';
import { FormType } from '../types/normalize';
import { catchError, finalize, map, takeWhile, tap } from 'rxjs/operators';
import { fromPromise, isPromise } from 'rxjs/internal-compatibility';
import { ArrayOrSet } from '../types/array-set';
import { isArrayOrSet } from '../utils/array-set';

/**
 * Returns an Observable that emits a string made from a source unicode string using String.normalize
 *
 * @category Create
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

export function fromUnicode(
  input: ObservableInput<ArrayOrSet<string> | string> | ArrayOrSet<string> | string,
  form?: FormType,
): Observable<string> {
  return new Observable<string>((subscriber) => {
    if (isObservable(input)) {
      (input as Observable<ArrayOrSet<string> | string>)
        .pipe(
          takeWhile(() => !subscriber.closed),
          map((value) => (isArrayOrSet(value) ? [...value] : [value])),
          tap((value) => {
            for (let i = 0; i < value.length; i++) {
              subscriber.next(value[i].normalize(form));
            }
          }),
          finalize(() => !subscriber.closed && subscriber.complete()),
        )
        .subscribe();
    } else if (isPromise(input)) {
      fromPromise(input as Promise<ArrayOrSet<string> | string>)
        .pipe(
          map<ArrayOrSet<string> | string, string[]>((value) =>
            Array.isArray(value) ? (value as string[]) : ([value] as string[]),
          ),
          tap((value) => {
            for (let i = 0; i < value.length; i++) {
              subscriber.next(value[i].normalize(form));
            }
          }),
          catchError((error) => {
            subscriber.error(error);
            return throwError(error);
          }),
          finalize(() => !subscriber.closed && subscriber.complete()),
        )
        .subscribe();
    } else {
      const value = Array.isArray(input) ? (input as string[]) : ([input] as string[]);
      for (let i = 0; i < value.length; i++) {
        subscriber.next(value[i].normalize(form));
      }
      !subscriber.closed && subscriber.complete();
    }
    /* istanbul ignore next-line */
    return () => !subscriber.closed && subscriber.complete();
  });
}

// export function fromUnicode<
//   A extends
//     | ObservableInput<ArrayOrSet<string> | string>
//     | PromiseLike<ArrayOrSet<string> | string>
//     | ArrayOrSet<string>
//     | string
// >(input: A, form?: FormType): Observable<string> {
//   if (isObservable(input)) {
//     return ((input as unknown) as Observable<ArrayOrSet<string> | string>).pipe(
//       map((value) => (isArrayOrSet(value) ? [...value] : [value]) as string[]),
//       switchMap((value) => {
//         return new Observable<string>((subscriber: Subscriber<unknown>): void => {
//           for (let i = 0; i < value.length; i++) {
//             subscriber.next(value[i].normalize(form));
//           }
//           subscriber.complete();
//         });
//       }),
//     );
//   } else if (isPromise(input)) {
//     return new Observable<string>((subscriber: Subscriber<unknown>): void => {
//       function callSubscriber(value: ArrayOrSet<string> | string) {
//         /* istanbul ignore next-line */
//         if (!subscriber.closed) {
//           const output = isArrayOrSet(value) ? [...value] : [value];
//           for (let i = 0; i < output.length; i++) {
//             subscriber.next(output[i].normalize(form));
//           }
//           subscriber.complete();
//         }
//       }
//
//       ((input as never) as Promise<ArrayOrSet<string> | string>).then(
//         (value) => callSubscriber(value),
//         (err) => subscriber.error(err),
//       );
//     });
//   } else {
//     const value = isArrayOrSet(input) ? ([...input] as string[]) : ([input] as string[]);
//
//     return new Observable<string>((subscriber: Subscriber<unknown>): void => {
//       for (let i = 0; i < value.length; i++) {
//         subscriber.next(value[i].normalize(form));
//       }
//       subscriber.complete();
//     });
//   }
// }
