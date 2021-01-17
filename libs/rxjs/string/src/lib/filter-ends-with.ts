/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string where the source string ends with the passed ending using String.endsWith
 *
 * @category Filter
 *
 * @see The [[endsWith]] operator returns the boolean value
 *
 * @param ending The string to check the source ends with
 * @param length Optional length of the string to check
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
  ending: string | Observable<string>,
  length?: number | Observable<number>,
): MonoTypeOperatorFunction<string> {
  const ending$ = (isObservable(ending) ? ending : of(ending)) as Observable<string>;
  const length$ = (isObservable(length) ? length : of(length)) as Observable<number>;
  return (source: Observable<string>) =>
    source.pipe(
      withLatestFrom(ending$, length$),
      map(([value, endingInput, lengthInput]) => (value.endsWith(endingInput, lengthInput) ? value : '')),
      filter((val) => Boolean(val)),
    );
}
