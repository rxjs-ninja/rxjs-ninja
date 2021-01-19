/**
 * @packageDocumentation
 * @module String
 */
import { Observable, Subscribable } from 'rxjs';
import { FormType } from '../types/normalize';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a string made from a source unicode string using String.normalize
 *
 * @category Create
 *
 * @remarks This operator is a type-safe {@link https://rxjs.dev/api/index/function/from|from} and will emit only
 * strings, also unlike `from` a single string is not converted into an array-like.
 *
 * @param input Single or list of Unicode character to convert to a string
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
