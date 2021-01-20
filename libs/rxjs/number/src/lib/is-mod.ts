/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a boolean is the source number has no remainder from the passed modulus
 *
 * @category Query
 *
 * @param modulus The dividing number for the Modulo operation
 *
 * @example Return if the source value has no remainder for modulus `3`
 * ```ts
 * const input = [2, 3, 4, 5, 6];
 * from(input).pipe(isMod(3)).subscribe();
 * ```
 * Output: `false, true, false, false, true`
 *
 * @returns Observable that emits a boolean is the source number has no remainder
 */
export function isMod(modulus: Subscribable<number> | number): OperatorFunction<number, boolean> {
  const modulus$ = createOrReturnObservable(modulus);
  return (source) =>
    source.pipe(
      withLatestFrom(modulus$),
      map(([value, modulusValue]) => value % modulusValue === 0),
    );
}
