/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

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
 * from(input).pipe(pow(2)).subscribe();
 * ```
 * Output: `4, 25, 100, 256, 655356`
 *
 * @returns Observable that emits a number that is the raised source value by the power
 */
export function pow(power: Subscribable<number> | number): MonoTypeOperatorFunction<number> {
  const power$ = createOrReturnObservable(power);
  return (source) =>
    source.pipe(
      withLatestFrom(power$),
      map(([value, inputValue]) => value ** inputValue),
    );
}
