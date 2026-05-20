/**
 * @packageDocumentation
 * @module String
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable string coerced from each source value using the `String()` function.
 *
 * @category Conversion
 *
 *
 * @example
 * Coerce values to strings
 * ```ts
 * of(42).pipe(coerceString()).subscribe();
 * ```
 * Output: `'42'`
 * @returns Observable that emits coerced strings
 */
export function coerceString(): OperatorFunction<unknown, string> {
  return (source) => source.pipe(map((value) => String(value)));
}
