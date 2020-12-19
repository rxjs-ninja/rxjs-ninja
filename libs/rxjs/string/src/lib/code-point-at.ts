/**
 * @packageDocumentation
 * @module String
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number, the character code of a character at the passed position in a source
 * string using String.codePointAt
 *
 * @category String Query
 *
 * @param position The index of the character to return in the source string
 *
 * @example
 * Return the code point of the character at index `1`
 * ```ts
 * fromString(['☃★♲']).pipe(codePointAt(1)).subscribe();
 * ```
 * Output: `9733`
 *
 * @returns Observable that emits a number that is a code point
 */
export function codePointAt(position: number): OperatorFunction<string, number | undefined> {
  return (source: Observable<string>) => source.pipe(map((value) => value.codePointAt(position)));
}
