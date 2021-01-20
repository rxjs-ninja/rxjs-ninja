/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable array where the source array contains boolean values, and flips the value to the opposite
 * boolean.
 *
 * @category Modify
 *
 * @example
 * Returns an array of all binary values flipped
 * ```ts
 * const input = [false, true, false];
 * of(input).pipe(flipArray()).subscribe();
 * ```
 * Output: `[true, false, true]`
 *
 * @returns Observable array of boolean values that are flipped from their original value
 */
export function flipArray(): OperatorFunction<Iterable<boolean>, boolean[]> {
  return (source) => source.pipe(map((value) => [...value].map((v) => !v)));
}
