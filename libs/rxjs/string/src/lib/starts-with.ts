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
 * @category String Query
 *
 * @param input The string to check the source string start with
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
  input: string | ObservableInput<string>,
  startIndex?: number | ObservableInput<number>,
): OperatorFunction<string, boolean> {
  return (source) =>
    source.pipe(
      withLatestFrom(
        (isObservable(input) ? input : of(input)) as Observable<string>,
        (isObservable(startIndex) ? startIndex : of(startIndex)) as Observable<number>,
      ),
      map(([value, inputValue, index]) => value.startsWith(inputValue, index)),
    );
}
