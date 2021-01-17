/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string where the source string is repeated with String.repeat.
 *
 * @remarks If a separator is passed it uses an array and will join the result using the separator instead, as
 *   `String.repeat` does not support it
 *
 * @category String Modify
 *
 * @param count The number of times to repeat the string
 * @param separator Optional separator for joining strings
 *
 * @example
 * Returns a string with the word `Ninja` repeated 5 times
 * ```ts
 * of('Ninja').pipe(repeat(5)).subscribe();
 * ```
 * Output: `NinjaNinjaNinjaNinjaNinja`
 *
 * @example
 * Returns a string with the word `Ninja` repeated 5 times with a `,` separator
 * ```ts
 * of('Ninja').pipe(repeat(5, ', ')).subscribe();
 * ```
 * Output: `Ninja, Ninja, Ninja, Ninja, Ninja`
 *
 * @returns Observable that emits a string of the source string repeated
 */
export function repeat(
  count: number | ObservableInput<number>,
  separator?: string | ObservableInput<string>,
): MonoTypeOperatorFunction<string> {
  const count$ = (isObservable(count) ? count : of(count)) as Observable<number>;
  const separator$ = (isObservable(separator) ? separator : of(separator)) as Observable<string>;
  return (source) =>
    source.pipe(
      withLatestFrom(count$, separator$),
      map(([value, countInput, separatorInput]) =>
        separatorInput ? new Array(countInput).fill(value).join(separatorInput) : value.repeat(countInput),
      ),
    );
}
