/**
 * @packageDocumentation
 * @module String
 */
import { Observable, Subscriber } from 'rxjs';

/**
 * Returns an Observable string of ASCII and Unicode characters from passed code points codes, can be an array or arguments or values. Uses
 * [String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint)
 * to generate the string
 *
 * @param args Character codes or an Array of character codes to create the Observable from
 *
 * @example
 * ```ts
 * fromCharCode(9733).subscribe();
 * // '★'
 * ```
 *
 * @example
 * ```ts
 * fromCharCode(9731, 9733, 9842).subscribe();
 * // '☃★♲'
 * ```
 *
 * @example
 * ```ts
 * fromCharCode([9731, 9733, 9842]).subscribe();
 * // '☃★♲'
 * ```
 *
 * @returns Observable that emits an ASCII/Unicode string from passed code points
 * @category String Creation
 */
export function fromCodePoint<T extends number | number[]>(...args: T[]): Observable<string> {
  const value = Array.isArray(args[0]) ? (args[0] as number[]) : ([...args] as number[]);
  return new Observable<string>((subscriber: Subscriber<string>): void => {
    subscriber.next(String.fromCodePoint(...value));
    subscriber.complete();
  });
}
