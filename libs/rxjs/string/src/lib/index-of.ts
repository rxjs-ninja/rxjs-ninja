/**
 * @packageDocumentation
 * @module String
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number of the first index from the source string where the search string begins
 * using String.indexOf
 *
 * @category String Query
 *
 * @param searchStr The string to search in the source string
 * @param start Optional start position if not from the beginning of the string
 *
 * @example
 * Returns the first index of `RxJS` in the string
 * ```ts
 * of('Hello RxJS Ninja, RxJS Rocks').pipe(indexOf('RxJS')).subscribe();
 * ```
 * Output: `6`
 *
 * @example
 * Returns the first index of `RxJS` in the string, starting from index `8`
 * ```ts
 * of('Hello RxJS Ninja, RxJS Rocks').pipe(indexOf('RxJS', 8)).subscribe();
 * ```
 * Output: `18`
 *
 * @returns Observable that emits a number that is the first index of the search string in the source string
 */
export function indexOf(searchStr: string, start?: number): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map((value) => value.indexOf(searchStr, start)));
}
