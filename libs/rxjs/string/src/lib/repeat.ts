/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string where the source string is repeated with String.repeat.
 *
 * @remarks If a separator is passed it uses an array and will join the result using the separator instead, as
 *   `String.repeat` does not support it
 *
 * @category String Modify
 *
 * @param count The number of times to repeat the string
 * @param separator Optional separator for joining strings
 *
 * @example
 * Returns a string with the word `Ninja` repeated 5 times
 * ```ts
 * of('Ninja').pipe(repeat(5)).subscribe();
 * ```
 * Output: `NinjaNinjaNinjaNinjaNinja`
 *
 * @example
 * Returns a string with the word `Ninja` repeated 5 times with a `,` separator
 * ```ts
 * of('Ninja').pipe(repeat(5, ', ')).subscribe();
 * ```
 * Output: `Ninja, Ninja, Ninja, Ninja, Ninja`
 *
 * @returns Observable that emits a string of the source string repeated
 */
export function repeat(count: number, separator?: string): MonoTypeOperatorFunction<string> {
  return separator
    ? (source: Observable<string>) => source.pipe(map((value) => new Array(count).fill(value).join(separator)))
    : (source: Observable<string>) => source.pipe(map((value) => value.repeat(count)));
}
