/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, Subscribable, throwError } from 'rxjs';
import { FormType } from '../types/normalize';
import { catchError, finalize, map, takeWhile, tap } from 'rxjs/operators';
import { fromPromise, isPromise } from 'rxjs/internal-compatibility';
import { ArrayOrSet } from '../types/array-set';
import { isArrayOrSet } from '../utils/array-set';
import { createOrReturnObservable } from 'libs/rxjs/string/src/utils/internal';

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
  input: Subscribable<Iterable<string> | string> | Iterable<string> | string,
  form?: FormType,
): Observable<string> {
  return new Observable<string>((subscriber) => {
    createOrReturnObservable(input)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map<Iterable<string> | string, string[]>((value) => (typeof value === 'string' ? [value] : [...value])),
        tap((value) => {
          for (let i = 0; i < value.length; i++) {
            subscriber.next(value[i].normalize(form));
          }
        }),
        finalize(() => !subscriber.closed && subscriber.complete()),
      )
      .subscribe();

    /* istanbul ignore next-line */
    return () => !subscriber.closed && subscriber.complete();
  });
}
