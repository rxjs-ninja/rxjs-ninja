/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string where the source string is reversed.
 *
 * @category Modify
 *
 * @remarks This operator turns a string into an array and uses Array.reverse and Array.join to create
 * a new string
 *
 * @example
 * Returns a string that is reversed
 * ```ts
 * of('emordnilaP').pipe(reverse()).subscribe();
 * ```
 * Output: `'Palindrome'`
 *
 * @returns Observable that emits a string that is reversed from the source
 */
export function reverse(): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => [...value].reverse().join('')));
}
