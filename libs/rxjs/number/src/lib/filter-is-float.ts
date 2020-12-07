/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Returns an Observable that emits only valid finite floating point numbers from a source
 *
 * @category Number Filter
 *
 * @see The [[isFloat]] operator returns a boolean value instead of the number
 *
 * @example
 * Return only values that are floating point numbers
 * ```ts
 * const input = [-10, -2.3, 0, 1, 2, 3.14, 4.2, 10, 11, 42];
 * from(input).pipe(filterIsFloat()).subscribe();
 * ```
 * Output: `-2.3, 3.14, 4.2`
 *
 * @returns Observable that emits valid finite floating point numbers
 */
export function filterIsFloat(): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) =>
    source.pipe(filter((value) => !Number.isNaN(value) && Number.isFinite(value) && !Number.isInteger(value)));
}
