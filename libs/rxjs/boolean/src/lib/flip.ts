/**
 * @packageDocumentation
 * @module Boolean
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a boolean values where the source Observable value has been boolean flipped
 *
 * @example
 * ```ts
 * const input = [false, true, false];
 * from(input).pipe(flip()).subscribe()
 * // true, false, true
 * ```
 *
 * @returns Observable that emits a boolean where the source Observable value have been flipped
 * @category Boolean Modify
 */
export function flip(): MonoTypeOperatorFunction<boolean> {
  return (source: Observable<boolean>) => source.pipe(map((value) => !value));
}
