/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a boolean value where the source string ends with the passed string parameter using
 * String.endsWith
 *
 * @category Query
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
  ending: string | ObservableInput<string>,
  length?: number | ObservableInput<number>,
): OperatorFunction<string, boolean> {
  const ending$ = (isObservable(ending) ? ending : of(ending)) as Observable<string>;
  const length$ = (isObservable(length) ? length : of(length)) as Observable<number>;
  return (source) =>
    source.pipe(
      withLatestFrom(ending$, length$),
      map(([value, endingInput, lengthInput]) => value.endsWith(endingInput, lengthInput)),
    );
}
