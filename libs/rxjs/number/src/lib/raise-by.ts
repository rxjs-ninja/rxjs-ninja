/**
 * @packageDocumentation
 * @module Number
 */
import { combineLatest, isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number from a source number that is raised by the passed power using the
 * exponentiation operator `**`
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
 * @category Number Modify
 */
export function raiseBy(power: number | ObservableInput<number>): MonoTypeOperatorFunction<number> {
  if (isObservable(power)) {
    return (source) => combineLatest([source, power]).pipe(map(([value, pow]) => value ** (pow as number)));
  }
  return (source) => source.pipe(map((value) => value ** (power as number)));
}
