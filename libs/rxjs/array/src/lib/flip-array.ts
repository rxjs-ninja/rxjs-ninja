/**
 * @packageDocumentation
 * @module Array
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable array where the source array contains boolean values, and flips the value to the opposite
 * boolean.
 *
 * @example
 * ```ts
 * const input = [false, true, false];
 * of(input).pipe(flipArray()).subscribe();
 * // [true, false, true]
 * ```
 *
 * @returns Observable array of boolean values that are flipped from their original value
 * @category RxJS Array Modify
 */
export function flipArray(): MonoTypeOperatorFunction<boolean[]> {
  return (source: Observable<boolean[]>) => source.pipe(map((value) => value.map((v) => !v)));
}
