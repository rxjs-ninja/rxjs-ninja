/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a number that is the multiplication of the source number with input number
 *
 * @category Math
 *
 * @param num The number to multiply to the source value
 *
 * @example Returns a number that is the multiplication of source and input
 * ```ts
 * const input = [2, 3, 4, 5, 6];
 * from(input).pipe(mul(2)).subscribe();
 * ```
 * Output: `4, 6, 8, 10, 12`
 *
 * @returns Observable that emits a number that is the multiplication of source and input
 */
export function mul(num: Subscribable<number> | number): MonoTypeOperatorFunction<number> {
  const num$ = createOrReturnObservable(num);
  return (source) =>
    source.pipe(
      withLatestFrom(num$),
      map(([value, numValue]) => value * numValue),
    );
}
