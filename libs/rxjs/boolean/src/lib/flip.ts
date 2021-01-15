/**
 * @packageDocumentation
 * @module Boolean
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a flipped boolean value from the source value
 *
 * @category Modify
 *
 * @example
 * Returns flipped boolean values
 * ```ts
 * const input = [false, true, false];
 * from(input).pipe(flip()).subscribe()
 * ```
 * Output: `true, false, true`
 *
 * @returns Observable that emits a boolean where the source Observable value have been flipped
 */
export function flip(): MonoTypeOperatorFunction<boolean> {
  return (source) => source.pipe(map((value) => !value));
}
