/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from 'libs/rxjs/string/src/utils/internal';

/**
 * Returns an Observable that emits a number of the last index from the source string where the search string begins
 * using String.lastIndexOf
 *
 * @category Query
 *
 * @param search The string to search in the source string
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
export function lastIndexOf(
  search: Subscribable<string> | string,
  lastIndex?: Subscribable<number> | number,
): OperatorFunction<string, number> {
  const search$ = createOrReturnObservable(search);
  const lastIndex$ = createOrReturnObservable(lastIndex);
  return (source) =>
    source.pipe(
      withLatestFrom(search$, lastIndex$),
      map(([value, searchInput, lastIndexInput]) => value.lastIndexOf(searchInput, lastIndexInput)),
    );
}
