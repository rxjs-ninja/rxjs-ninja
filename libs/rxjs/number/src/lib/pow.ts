/**
 * @packageDocumentation
 * @module Number
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number from a source number that is raised by the passed power using the
 * exponentiation operator `**`
 *
 * @category Math
 *
 * @param power The number to raise the value by
 *
 * @example Return values raised to the power `2`
 * ```ts
 * const input = [2, 4, 10, 16, 256];
 * from(input).pipe(raiseBy(2)).subscribe();
 * ```
 * Output: `4, 25, 100, 256, 655356`
 *
 * @returns Observable that emits a number that is the raised source value by the power
 */
export function pow(power: number | ObservableInput<number>): MonoTypeOperatorFunction<number> {
  return (source) =>
    source.pipe(
      withLatestFrom((isObservable(power) ? power : of(power)) as Observable<number>),
      map(([value, inputValue]) => value ** inputValue),
    );
}
