/**
 * @packageDocumentation
 * @module String
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a boolean where the source string contains with the passed search string using
 * String.includes
 *
 * @category Query
 *
 * @see The [[filterIncludes]] operator returns the string value
 *
 * @param search The string to check the source ends with
 *
 * @example
 * Return a boolean where the source string includes 'JS'
 * ```ts
 * from(['RxJS', 'Ninja', 'Tests']).pipe(includes('JS')).subscribe();
 * ```
 * Output: `true, false, false`
 *
 * @returns Observable that emits a boolean
 */
export function includes(search: Subscribable<string> | string): OperatorFunction<string, boolean> {
  const search$ = createOrReturnObservable(search);
  return (source) =>
    source.pipe(
      withLatestFrom(search$),
      map(([value, searchValue]) => value.includes(searchValue)),
    );
}
