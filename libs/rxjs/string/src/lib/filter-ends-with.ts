/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string where the source string ends with the passed ending using String.endsWith
 *
 * @category String Filter
 *
 * @see The [[endsWith]] operator returns the boolean value
 *
 * @param ending The string to check the source ends with
 * @param length Optional length of the string to check
 *
 * @example
 * Return a string where the source string ends with the `S` character
 * ```ts
 * from(['RxJS', 'Ninja', 'Tests']).pipe(filterEndsWith('S')).subscribe();
 * ```
 * Output: `RxJS`
 *
 * @example
 * Return a string where the source string at up to length `4` ends with the `t` character
 * ```ts
 * from(['RxJS', 'Ninja', 'Tests']).pipe(filterEndsWith('t', 4)).subscribe();
 * ```
 * Output: `Tests`
 *
 * @returns Observable that emits a string
 */
export function filterEndsWith(ending: string, length?: number): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(filter((value) => value.endsWith(ending, length)));
}
