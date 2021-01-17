/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

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
  search: string | ObservableInput<string>,
  startIndex?: number | ObservableInput<number>,
): OperatorFunction<string, boolean> {
  const search$ = (isObservable(search) ? search : of(search)) as Observable<string>;
  const startIndex$ = (isObservable(startIndex) ? startIndex : of(startIndex)) as Observable<number>;
  return (source) =>
    source.pipe(
      withLatestFrom(search$, startIndex$),
      map(([value, inputValue, index]) => value.startsWith(inputValue, index)),
    );
}
