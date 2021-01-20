/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a number that is the remainder of the Modulo operation of the source number
 * by the divider
 *
 * @category Math
 *
 * @param modulus The dividing number for the Modulo operation
 *
 * @example Return the remainder of modulus `3`
 * ```ts
 * const input = [2, 3, 4, 5, 6];
 * from(input).pipe(mod(3)).subscribe();
 * ```
 * Output: `2, 0, 1, 2, 6`
 *
 * @returns Observable that emits a number that is reminder of a Modulo operation
 */
export function mod(modulus: Subscribable<number> | number): MonoTypeOperatorFunction<number> {
  const modulus$ = createOrReturnObservable(modulus);
  return (source) =>
    source.pipe(
      withLatestFrom(modulus$),
      map(([value, modulusValue]) => value % modulusValue),
    );
}
