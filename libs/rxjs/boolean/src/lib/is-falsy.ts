/**
 * @packageDocumentation
 * @module Boolean
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable boolean for whether each source value is falsy (`!Boolean(value)`).
 *
 * @category Query
 *
 * @returns Observable that emits whether the value is falsy
 */
export function isFalsy(): OperatorFunction<unknown, boolean> {
  return (source) => source.pipe(map((value) => !Boolean(value)));
}
