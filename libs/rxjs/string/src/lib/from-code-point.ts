/**
 * @packageDocumentation
 * @module String
 */
import { Observable, Subscribable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a string made from code points using String.fromCodePoint
 *
 * @remarks This operator will emit a single string for all input passed including arrays
 *
 * @category Create
 *
 * @param input Observable input, Promise, Array or argument list of code points
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
export function fromCodePoint(
  input: Subscribable<Iterable<number> | number> | Iterable<number> | number,
): Observable<string> {
  return createOrReturnObservable(input).pipe(
    map<Iterable<number> | number, number[]>((value) => (typeof value === 'number' ? [value] : [...value])),
    map((value) => String.fromCodePoint(...value)),
  );
}
