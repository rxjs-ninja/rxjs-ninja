/**
 * @packageDocumentation
 * @module Number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a boolean value when a source number is a finite number using Number.isFinite
 *
 * @category Number Query
 *
 * @see The [[filterIsFinite]] operator returns the number value
 *
 * @example
 * Return boolean for finite values
 * ```ts
 * const input = [-Infinity, -2.3, 0, 1, Infinity, 3.14, 4.2, 10, 11, Number.MAX_VALUE * 2];
 * from(input).pipe(isFinite()).subscribe();
 * ```
 * Output: `false, true, true, true, false, true, true, true, true, false`
 *
 * @returns Observable that emits a boolean of a source number being finite
 */
export function isFinite(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) => source.pipe(map((value) => Number.isFinite(value)));
}
