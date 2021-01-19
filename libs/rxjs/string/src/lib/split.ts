/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from 'libs/rxjs/string/src/utils/internal';

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
  separator: Subscribable<string> | string = ' ',
  limit?: Subscribable<number> | number,
): OperatorFunction<string, string[]> {
  const separator$ = createOrReturnObservable(separator);
  const limit$ = createOrReturnObservable(limit);
  return (source) =>
    source.pipe(
      withLatestFrom(separator$, limit$),
      map(([value, separatorValue, limitValue]) => value.split(separatorValue, limitValue)),
    );
}
