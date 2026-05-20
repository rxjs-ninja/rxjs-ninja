/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable boolean indicating whether the emitted value is an array using `Array.isArray`.
 *
 * @category Query
 *
 * @returns An Observable that emits whether the source value is an array
 */
export function isArray(): OperatorFunction<unknown, boolean> {
  return (source) => source.pipe(map((value) => Array.isArray(value)));
}
