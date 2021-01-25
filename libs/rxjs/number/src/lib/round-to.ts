/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a number value rounded to the number of digits passed
 *
 * @category Modify
 *
 * @param precision Maximum number of digits to round the number to
 *
 * @example Return a number to fixed position of `2`
 * ```ts
 * const input = [1.8372, 2.12353, 3.14, 42.2];
 * from(input).pipe(roundTo(2)).subscribe();
 * ```
 * Output: `1.84, 2.12, 3.14, 42.2`
 *
 * @returns Observable that emits a number number to a fixed decimal value
 */
export function roundTo(precision: Subscribable<number> | number): MonoTypeOperatorFunction<number> {
  const precision$ = createOrReturnObservable(precision);
  return (source) =>
    source.pipe(
      withLatestFrom(precision$),
      map(([value, precisionValue]) => {
        const factor = 10 ** precisionValue;
        return Math.round(value * factor) / factor;
      }),
    );
}
