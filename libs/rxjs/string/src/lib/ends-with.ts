/**
 * @packageDocumentation
 * @module String
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a boolean value where the source string ends with the passed string parameter using
 * String.endsWith
 *
 * @category Query
 *
 * @see The [[filterEndsWith]] operator returns the string value
 *
 * @param search The string to check the source ends with
 * @param maxLength Optional length of the string to check
 *
 * @example
 * Return if the source string ends with the `S` character
 * ```ts
 * from(['RxJS', 'Ninja', 'Tests']).pipe(endsWith('S')).subscribe();
 * ```
 * Output: `true, false, false`
 *
 * @example
 * Return if the source string at up to length `4` ends with the `t` character
 * ```ts
 * from(['RxJS', 'Ninja', 'Tests']).pipe(endsWith('t', 4)).subscribe();
 * ```
 * Output: `false, false, true`
 *
 * @returns Observable that emits a boolean of the source string ending with the passed input
 */
export function endsWith(
  search: Subscribable<string> | string,
  maxLength?: Subscribable<number> | number,
): OperatorFunction<string, boolean> {
  const search$ = createOrReturnObservable(search);
  const maxLength$ = createOrReturnObservable(maxLength);
  return (source) =>
    source.pipe(
      withLatestFrom(search$, maxLength$),
      map(([value, searchValue, maxLengthValue]) => value.endsWith(searchValue, maxLengthValue)),
    );
}
