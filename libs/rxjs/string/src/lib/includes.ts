/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a boolean where the source string contains with the passed search string using
 * String.includes
 *
 * @category String Query
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
export function includes(search: string | ObservableInput<string>): OperatorFunction<string, boolean> {
  const search$ = (isObservable(search) ? search : of(search)) as Observable<string>;
  return (source) =>
    source.pipe(
      withLatestFrom(search$),
      map(([value, searchInput]) => value.includes(searchInput)),
    );
}
