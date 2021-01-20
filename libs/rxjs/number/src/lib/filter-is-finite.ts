/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Returns an Observable that emits numbers from a source where they pass the check of Number.isFinite.
 *
 * @category Filter
 *
 * @remarks Certain operations such as dividing by zero or multiplying passed `Number.MAX_VALUE` in JavaScript can cause
 *   `Infinity` to be generated, this operator can help avoid those values
 *
 * @see The [[isFinite]] operator returns a boolean value instead of the number
 *
 * @example
 * Return only finite values
 * ```ts
 * const input = [-Infinity, -2.3, 0, 1, Infinity, 3.14, 4.2, 10, 11, Number.MAX_VALUE * 2];
 * from(input).pipe(filterIsFinite()).subscribe();
 * ```
 * Output: `-2.3, 0, 2, 3.14, 4.2, 10, 11`
 *
 * @returns Observable that emits numbers that are finite
 */
export function filterIsFinite(): MonoTypeOperatorFunction<number> {
  return (source) => source.pipe(filter((value) => Number.isFinite(value)));
}
