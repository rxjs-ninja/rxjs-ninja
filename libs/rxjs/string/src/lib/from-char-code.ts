/**
 * @packageDocumentation
 * @module String
 */
import { Observable, Subscribable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isIterable } from 'rxjs/internal-compatibility';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a string made from character codes using String.fromCharCode
 *
 * @remarks This operator will emit a single string for all input passed including arrays
 *
 * @see The [[mapCharCode]] operator can be used to map an Observable source of char codes to strings
 *
 * @category Create
 *
 * @param input Single or list of character codes to convert to a string
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
