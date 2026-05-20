/**
 * @packageDocumentation
 * @module Boolean
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable boolean indicating whether each source value is a boolean primitive using `typeof`.
 *
 * @category Query
 *
 * @returns Observable that emits whether the value is a boolean
 */
export function isBoolean(): OperatorFunction<unknown, boolean> {
  return (source) => source.pipe(map((value) => typeof value === 'boolean'));
}
