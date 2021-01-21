/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Returns an Observable that emits number values from a source filtering out any NaN values.
 *
 * @category Filter
 *
 * @see The [[isNaN]] and [[isNotNaN]] operator returns a boolean value instead of the number
 *
 * @example
 * Returns only valid numbers where the source may contain NaN values
 * ```ts
 * const input = [NaN, -2.3, 0, NaN, 2, 3.14, 4.2, NaN, 11, 42];
 * from(input).pipe(filterNaN()).subscribe()
 * ```
 * Output: `-2.3, 0, 2, 3.14, 4.2, 11, 42`
 *
 * @returns Observable that emits valid numbers and excludes NaN values
 */
export function filterNaN(): MonoTypeOperatorFunction<number> {
  return (source) => source.pipe(filter((value) => !Number.isNaN(value)));
}
