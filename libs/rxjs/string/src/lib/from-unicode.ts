/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, Subscriber } from 'rxjs';
import { FormType } from '../types/normalize';
import { map } from 'rxjs/operators';
import { isPromise } from 'rxjs/internal-compatibility';

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
export function fromUnicode<T extends ObservableInput<string[]> | PromiseLike<string[]> | string | string[]>(
  input: T,
  form?: FormType,
): Observable<string> {
  if (isObservable(input)) {
    return ((input as never) as Observable<number[]>).pipe(map((input) => String.fromCodePoint(...input)));
  } else if (isPromise(input)) {
    return new Observable<string>((subscriber: Subscriber<unknown>): void => {
      ((input as never) as Promise<number[]>).then(
        (input) => {
          if (!subscriber.closed) {
            subscriber.next(String.fromCodePoint(...input));
            subscriber.complete();
          }
        },
        (err) => subscriber.error(err),
      );
    });
  } else {
    const value = Array.isArray(input) ? input : [input];
    return new Observable<string>((subscriber: Subscriber<string>): void => {
      for (let i = 0; i < value.length; i++) {
        subscriber.next(value[i].normalize(form));
      }
      subscriber.complete();
    });
  }
}
