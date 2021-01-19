/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, ObservableInput, Subscribable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a string where the source string contains with the passed search string using
 * String.includes
 *
 * @category Filter
 *
 * @see The [[includes]] operator returns the boolean value
 *
 * @param search The string to check the source ends with
 *
 * @example
 * Return a string where the source string includes 'JS'
 * ```ts
 * from(['RxJS', 'Ninja', 'Tests']).pipe(filterIncludes('JS')).subscribe();
 * ```
 * Output: `RxJS`
 *
 * @returns Observable that emits a string
 */
export function filterIncludes(search: Subscribable<string> | string): MonoTypeOperatorFunction<string> {
  const search$ = createOrReturnObservable(search);
  return (source) =>
    source.pipe(
      withLatestFrom(search$),
      map(([value, searchValue]) => (value.includes(searchValue) ? value : '')),
      filter((value) => Boolean(value)),
    );
}
