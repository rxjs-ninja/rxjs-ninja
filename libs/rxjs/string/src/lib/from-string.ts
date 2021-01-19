/**
 * @packageDocumentation
 * @module String
 */
import { Observable, Subscribable } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits strings from any an argument list of strings or  supported Observable, Promise or
 * Array-like source
 *
 * @category Create
 *
 * @remarks This operator is a type-safe {@link https://rxjs.dev/api/index/function/from|from} and will emit only
 * strings, also unlike `from` a single string is not converted into an array-like.
 *
 * @param input Argument list, Observable input, Promise or Array of strings
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

export function fromString(
  input: Subscribable<Iterable<string> | string> | Iterable<string> | string,
): Observable<string> {
  return new Observable<string>((subscriber) => {
    createOrReturnObservable(input)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map<Iterable<string> | string, string[]>((value) => (typeof value === 'string' ? [value] : [...value])),
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
