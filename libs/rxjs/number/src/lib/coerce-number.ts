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
 * @returns Observable that emits coerced numbers
 */
export function coerceNumber(): OperatorFunction<unknown, number> {
  return (source) => source.pipe(map((value) => Number(value)));
}
