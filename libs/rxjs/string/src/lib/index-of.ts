/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number of the first index from the source string where the search string begins
 * using String.indexOf
 *
 * @category Query
 *
 * @param search The string to search in the source string
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
export function indexOf(
  search: string | ObservableInput<string>,
  start?: number | ObservableInput<number>,
): OperatorFunction<string, number> {
  const search$ = (isObservable(search) ? search : of(search)) as Observable<string>;
  const start$ = (isObservable(start) ? start : of(start)) as Observable<number>;
  return (source) =>
    source.pipe(
      withLatestFrom(search$, start$),
      map(([value, searchInput, startInput]) => value.indexOf(searchInput, startInput)),
    );
}
