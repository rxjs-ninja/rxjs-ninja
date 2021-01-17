/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Returns an Observable that emits only integer numbers from a source that pass the check of Number.isInteger.
 *
 * @category Filter
 *
 * @see The [[isInteger]] operator returns a boolean value instead of the number
 *
 * @example
 * Return only values that are integer values
 * ```ts
 * const input = [-10, -2.3, 0, 1, 2, 3.14, 4.2, 10, 11, 42];
 * from(input).pipe(filterIsInteger()).subscribe()
 * ```
 * Output: `-10, 0, 1, 2, 10, 11, 42`
 *
 * @returns Observable that emits integer numbers
 */
export function filterIsInteger(): MonoTypeOperatorFunction<number> {
  return (source) => source.pipe(filter((value) => Number.isInteger(value)));
}
