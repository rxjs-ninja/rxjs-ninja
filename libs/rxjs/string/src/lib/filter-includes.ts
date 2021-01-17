/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string where the source string contains with the passed search string using
 * String.includes
 *
 * @category String Filter
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
export function filterIncludes(search: string | ObservableInput<string>): MonoTypeOperatorFunction<string> {
  const search$ = (isObservable(search) ? search : of(search)) as Observable<string>;
  return (source: Observable<string>) =>
    source.pipe(
      withLatestFrom(search$),
      map(([value, inputValue]) => (value.includes(inputValue) ? value : '')),
      filter((value) => Boolean(value)),
    );
}
