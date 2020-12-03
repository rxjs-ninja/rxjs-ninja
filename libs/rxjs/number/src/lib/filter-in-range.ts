/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Returns an Observable that emits number values from a source Observable that fall within the passed `min` and `max` range,
 * including the range numbers.  To emit only numbers between the `min` and `max` set `excludeBoundingValues` to `true`.
 *
 * - If you want to get the boolean value of a number being outside a range of min/max use [[inRange]] operator instead
 * - If you want the number value being outside a range of min/max use the [[filterInRange]] operator instead
 *
 * @param min The minimum number for the range
 * @param max The maximum number for the range
 * @param excludeBoundingValues If set to `true` only values between the `min` and `max` will be returned, if `true` they will be included
 *
 * @example
 * ```ts
 * const input = [-1, 0, 1, 2, 10, 11];
 * fromNumber(input).pipe(filterInRange(0, 10)).subscribe();
 * // [0, 1, 2, 10]
 * ```
 *
 * @example
 * ```ts
 * const input = [-1, 0, 1, 2, 10, 11];
 * fromNumber(input).pipe(filterInRange(0, 10, true)).subscribe();
 *  subscribe(); // [1, 2]
 * ```
 *
 * @returns Observable that emits a number that falls within the passed `min` and `max` range
 * @category RxJS Number Filter
 */
export function filterInRange(
  min: number,
  max: number,
  excludeBoundingValues?: boolean,
): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) =>
    source.pipe(filter((value) => (excludeBoundingValues ? value > min && value < max : value >= min && value <= max)));
}
