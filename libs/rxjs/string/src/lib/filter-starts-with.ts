/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string where the source string starts with the passed string using
 * String.startsWith
 *
 * @category String Filter
 *
 * @see The [[startsWith]] operator returns the boolean value
 *
 * @param start The string to check the source starts with
 * @param startFrom Optional index to start the check from
 *
 * @example
 * Return a string where the source string starts with the `N` character
 * ```ts
 * from(['RxJS', 'Ninja', 'Tests']).pipe(filterStartsWith('N')).subscribe();
 * ```
 * Output: `Ninja`
 *
 * @example
 * Return a string where the source string starts with `t` character from index `3`
 * ```ts
 * from(['RxJS', 'Ninja', 'Tests']).pipe(filterStartsWith('t', 3)).subscribe();
 * ```
 * Output: `Tests`
 *
 * @returns Observable that emits a string
 */
export function filterStartsWith(start: string, startFrom?: number): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(filter((value) => value.startsWith(start, startFrom)));
}
