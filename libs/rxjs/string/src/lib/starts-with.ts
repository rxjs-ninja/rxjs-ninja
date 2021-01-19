/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from 'libs/rxjs/string/src/utils/internal';

/**
 * Returns an Observable that emits a boolean when the source string contains the input string at the start of the
 * source string using String.startsWith
 *
 * @category Query
 *
 * @param search The string to check the source string start with
 * @param startIndex Optional start index to being searching the string from
 *
 * @remarks
 * If you need to get the string value instead of boolean use [[filterStartsWith]]
 *
 * @example
 * Return a boolean if the source string starts with the passed input
 * ```ts
 * from(['RxJS', 'Ninja', 'Hero']).pipe(startsWith('R')).subscribe();
 * ```
 * Output: `true, false, false`
 *
 * @example
 * Return a boolean if the source string starts with the passed input from index `1`
 * ```ts
 * from(['RxJS', 'Ninja', 'Hero']).pipe(startsWith('x', 1)).subscribe();
 * ```
 * Output: `true, false, false`
 *
 * @returns Observable that emits a boolean if the source string start with the input string
 */
export function startsWith(
  search: Subscribable<string> | string,
  startIndex?: Subscribable<number> | number,
): OperatorFunction<string, boolean> {
  const search$ = createOrReturnObservable(search);
  const startIndex$ = createOrReturnObservable(startIndex);
  return (source) =>
    source.pipe(
      withLatestFrom(search$, startIndex$),
      map(([value, searchValue, indexValue]) => value.startsWith(searchValue, indexValue)),
    );
}
