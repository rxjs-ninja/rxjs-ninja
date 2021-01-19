/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, Subscribable, throwError } from 'rxjs';
import { catchError, finalize, map, takeWhile, tap } from 'rxjs/operators';
import { fromPromise, isIterable, isPromise } from 'rxjs/internal-compatibility';
import { isArrayOrSet } from '../utils/array-set';
import { ArrayOrSet } from '../types/array-set';
import { createOrReturnObservable } from 'libs/rxjs/string/src/utils/internal';

/**
 * Returns an Observable that emits a string made from character codes using String.fromCharCode
 *
 * @remarks This operator will emit a single string for all input passed including arrays
 *
 * @see The [[mapCharCode]] operator can be used to map an Observable source of char codes to strings
 *
 * @category Create
 *
 * @param input Observable input, Promise, Array or argument list of character codes
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
export function fromCharCode(
  input: Subscribable<Iterable<number> | number> | Iterable<number> | number,
): Observable<string> {
  return createOrReturnObservable(input).pipe(
    map<Iterable<number> | number, number[]>((value) => (isIterable(value) ? [...value] : [value])),
    map((value) => String.fromCharCode(...value)),
  );
}
