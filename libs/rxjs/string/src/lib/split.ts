/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits an array from a source string split by the separator using String.split
 *
 * @category Convert
 *
 * @param separator The character to split the string at
 * @param limit Optional limit for the number of times to split
 *
 * @example
 * Returns an array of a string split on the `|` character
 * ```ts
 * of('Hello|World|RxJS|Ninja').pipe(split('|')).subscribe();
 * ```
 * Output: `['Hello', 'World', 'RxJS', 'Ninja']`
 *
 * @example
 * Returns an array of a string split on the `|` character, limiting to the first `2`
 * ```ts
 * of('Hello|World|RxJS|Ninja').pipe(split('|', 2)).subscribe();
 * ```
 * Output: `['Hello', 'World']`
 *
 * @returns Observable that emits an array of strings from the source string split on the separator
 */
export function split(
  separator: string | ObservableInput<string>,
  limit?: number | ObservableInput<number>,
): OperatorFunction<string, string[]> {
  const separator$ = (isObservable(separator) ? separator : of(separator)) as Observable<string>;
  const limit$ = (isObservable(limit) ? limit : of(limit)) as Observable<number>;
  return (source) =>
    source.pipe(
      withLatestFrom(separator$, limit$),
      map(([value, separatorInput, limitInput]) => value.split(separatorInput, limitInput)),
    );
}
