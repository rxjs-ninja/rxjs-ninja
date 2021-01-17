/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Returns an Observable that emits numbers that are within the safe number range for JavaScript number precision using
 * Number.isSafeInteger
 *
 * @category Filter
 *
 * @see The [[isSafeInteger]] operator returns a boolean value instead of the number
 *
 * @example
 * Returns only integers within safe precision range
 * ```ts
 * // `Math.pow(2, 53)` is not within the safe integer range
 * const input = [-10, -2.3, 0, 1, 2, 3.14, Math.pow(2, 53) - 1, Math.pow(2, 53), Infinity];
 * from(input).pipe(filterIsSafeInteger()).subscribe()
 * ```
 * Output: `-10, 0, 1, 2, 9007199254740991`
 *
 * @returns Observable that emits integer numbers within `Number.isSafeInteger` equality check
 */
export function filterIsSafeInteger(): MonoTypeOperatorFunction<number> {
  return (source) => source.pipe(filter((num) => Number.isSafeInteger(num)));
}
