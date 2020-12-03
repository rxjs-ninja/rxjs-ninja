/**
 * @packageDocumentation
 * @module String
 */
import { Observable, Subscriber } from 'rxjs';

/**
 * Returns an Observable string of ASCII characters from passed character codes, can be an array or arguments or values. Uses
 * [String.fromCharCode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
 * to generate the string
 *
 * @param args Character codes or an Array of character codes to create the Observable from
 *
 * @example
 * ```ts
 * fromCharCode(65).subscribe();
 * // 'A'
 * ```
 *
 * @example
 * ```ts
 * fromCharCode(65, 66, 67, 68).subscribe();
 * // 'ABCD'
 * ```
 *
 * @example
 * ```ts
 * fromCharCode([65, 66, 67, 68]).subscribe();
 * // 'ABCD'
 * ```
 *
 * @returns Observable that emits an ASCII string from passed character codes
 * @category RxJS String Creation
 */
export function fromCharCode<T extends number | number[]>(...args: T[]): Observable<string> {
  const value = Array.isArray(args[0]) ? (args[0] as number[]) : ([...args] as number[]);
  return new Observable<string>((subscriber: Subscriber<string>): void => {
    subscriber.next(String.fromCharCode(...value));
    subscriber.complete();
  });
}
