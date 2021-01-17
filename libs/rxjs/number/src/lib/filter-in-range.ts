/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Returns an Observable that emits numbers, where that number falls between the provided `min` and `max` values.
 * When filtering in range, the range numbers are included in the filter - to exclude them set `excludeBoundingValues`
 * to `true`.
 *
 * @category Filter
 *
 * @see The [[inRange]] operator returns a boolean value instead of the number
 * @see The [[filterOutOfRange]] can be used to get numbers that fall outside the `min` and `max` range
 *
 * @param min The minimum range value
 * @param max The maximum range value
 * @param excludeBoundingValues Also filter the `min` and `max` values from the Observable
 *
 * @example
 * Return only numbers in and including the range of `0` to `10`
 * ```ts
 * const input = [-10, -2.3, 0, 1, 2, 3.14, 4.2, 10, 11, 42];
 * from(input).pipe(filterInRange(0, 10)).subscribe();
 * ```
 * Output: `0, 1, 2, 3.4, 4.2, 10`
 *
 * @example
 * Return only numbers in the range of `0` to `10` and also filter the `min` and `max`
 * ```ts
 * const input = [-10, -2.3, 0, 1, 2, 3.14, 4.2, 10, 11, 42];
 * from(input).pipe(filterInRange(0, 10, true)).subscribe();
 * ```
 * Output: `1, 2, 3.14, 4.2`
 *
 * @returns Observable that emits a number that falls within the passed `min` and `max` range
 */
export function filterInRange(
  min: number,
  max: number,
  excludeBoundingValues?: boolean,
): MonoTypeOperatorFunction<number> {
  return (source) =>
    excludeBoundingValues
      ? source.pipe(filter((value) => value > min && value < max))
      : source.pipe(filter((value) => value >= min && value <= max));
}
