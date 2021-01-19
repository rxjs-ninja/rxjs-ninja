/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a string where the source string starts with the passed string using
 * String.startsWith
 *
 * @category Filter
 *
 * @see The [[startsWith]] operator returns the boolean value
 *
 * @param search The string to check the source starts with
 * @param startIndex Optional index to start the check from
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
export function filterStartsWith(
  search: Subscribable<string> | string,
  startIndex?: Subscribable<number> | number,
): MonoTypeOperatorFunction<string> {
  const search$ = createOrReturnObservable(search);
  const startIndex$ = createOrReturnObservable(startIndex);
  return (source) =>
    source.pipe(
      withLatestFrom(search$, startIndex$),
      map(([value, searchValue, startIndexValue]) => (value.startsWith(searchValue, startIndexValue) ? value : '')),
      filter((value) => Boolean(value)),
    );
}
