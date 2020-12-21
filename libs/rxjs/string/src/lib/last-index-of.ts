/**
 * @packageDocumentation
 * @module String
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number of the last index from the source string where the search string begins
 * using String.lastIndexOf
 *
 * @category String Query
 *
 * @param searchStr The string to search in the source string
 * @param lastIndex The index of the last character in the string to search up to
 *
 * @example
 * Returns the first index of `RxJS` in the string
 * ```ts
 * of('Hello RxJS Ninja, RxJS Rocks').pipe(lastIndexOf('RxJS')).subscribe();
 * ```
 * Output: `18`
 *
 * @example
 * Returns the first index of `RxJS` in the string, ending at index `15`
 * ```ts
 * of('Hello RxJS Ninja, RxJS Rocks').pipe(lastIndexOf('RxJS', 15)).subscribe();
 * ```
 * Output: `6`
 *
 * @returns Observable that emits a number that is the last index of the search string in the source string
 */
export function lastIndexOf(searchStr: string, lastIndex?: number): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map((value) => value.lastIndexOf(searchStr, lastIndex)));
}
