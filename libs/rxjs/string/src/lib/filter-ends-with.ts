/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, MonoTypeOperatorFunction, Observable, of, Subscribable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from 'libs/rxjs/string/src/utils/internal';

/**
 * Returns an Observable that emits a string where the source string ends with the passed ending using String.endsWith
 *
 * @category Filter
 *
 * @see The [[endsWith]] operator returns the boolean value
 *
 * @param search The string to check the source ends with
 * @param maxLength Optional length of the string to check
 *
 * @example
 * Return a string where the source string ends with the `S` character
 * ```ts
 * from(['RxJS', 'Ninja', 'Tests']).pipe(filterEndsWith('S')).subscribe();
 * ```
 * Output: `RxJS`
 *
 * @example
 * Return a string where the source string at up to length `4` ends with the `t` character
 * ```ts
 * from(['RxJS', 'Ninja', 'Tests']).pipe(filterEndsWith('t', 4)).subscribe();
 * ```
 * Output: `Tests`
 *
 * @returns Observable that emits a string
 */
export function filterEndsWith(
  search: Subscribable<string> | string,
  maxLength?: Subscribable<number> | number,
): MonoTypeOperatorFunction<string> {
  const search$ = createOrReturnObservable(search);
  const maxLength$ = createOrReturnObservable(maxLength);
  return (source) =>
    source.pipe(
      withLatestFrom(search$, maxLength$),
      map(([value, searchValue, maxLengthValue]) => (value.endsWith(searchValue, maxLengthValue) ? value : '')),
      filter((val) => Boolean(val)),
    );
}
