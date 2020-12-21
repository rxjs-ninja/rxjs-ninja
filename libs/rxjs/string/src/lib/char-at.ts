/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string character that is at the passed position in a source string using
 * String.charAt
 *
 * @category String Query
 *
 * @param position The index of the character to return in the source string
 *
 * @example
 * Return the character at index `1`
 * ```ts
 * of('RxJS Ninja').pipe(charAt(1)).subscribe();
 * ```
 * Output: `x`
 *
 * @returns Observable that emits a string character
 */
export function charAt(position: number): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.charAt(position)));
}
