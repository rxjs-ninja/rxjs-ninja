/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, of, OperatorFunction } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a boolean value where the source string ends with the passed string parameter using
 * String.endsWith
 *
 * @category String Query
 *
 * @see The [[filterEndsWith]] operator returns the string value
 *
 * @param ending The string to check the source ends with
 * @param length Optional length of the string to check
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
  ending: string | Observable<string>,
  length?: number | Observable<number>,
): OperatorFunction<string, boolean> {
  return (source: Observable<string>) =>
    source.pipe(
      withLatestFrom(isObservable(ending) ? ending : of(ending), isObservable(length) ? length : of(length)),
      map(([value, endingInput, lengthInput]) => value.endsWith(endingInput, lengthInput)),
    );
}
