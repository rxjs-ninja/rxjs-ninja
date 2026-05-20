/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable number coerced from each source value using the `Number()` function.
 *
 * @category Conversion
 *
 *
 * @example
 * Coerce string emissions to numbers
 * ```ts
 * of('42', '-3').pipe(coerceNumber()).subscribe();
 * ```
 * Output: `42, -3`
 * @returns Observable that emits coerced numbers
 */
export function coerceNumber(): OperatorFunction<unknown, number> {
  return (source) => source.pipe(map((value) => Number(value)));
}
