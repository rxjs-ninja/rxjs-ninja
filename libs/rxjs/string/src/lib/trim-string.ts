/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string where the source string has any white space at the start removed using
 * String.trimStart
 *
 * @category String Modify
 *
 * @alias `trimLeft`
 *
 * @example
 * Returns the source string with any whitespace at the start removed
 * ```ts
 * of('  RxJS Ninja  ').pipe(trimStart()).subscribe();
 * ```
 * Output: `'RxJS Ninja  '`
 *
 * @returns Observable that emits a trimmed string
 */
export function trimStart(): MonoTypeOperatorFunction<string> {
  return (source) => source.pipe(map((value) => value.trimStart()));
}

/**
 * Returns an Observable that emits a string where the source string has any white space at the end removed using
 * String.trimEnd
 *
 * @category String Modify
 *
 * @alias `trimRight`
 *
 * @example
 * Returns the source string with any whitespace at the end removed
 * ```ts
 * of('  RxJS Ninja  ').pipe(trimStart()).subscribe();
 * ```
 * Output: `'  RxJS Ninja'`
 *
 * @returns Observable that emits a trimmed string
 */
export function trimEnd(): MonoTypeOperatorFunction<string> {
  return (source) => source.pipe(map((value) => value.trimEnd()));
}

/**
 * Returns an Observable that emits a string where the source string has any white space at the ends removed using
 * String.trim
 *
 * @category String Modify
 *
 * @example
 * Returns the source string with any whitespace at both ends removed
 * ```ts
 * of('  RxJS Ninja  ').pipe(trimStart()).subscribe();
 * ```
 * Output: `'RxJS Ninja'`
 *
 * @returns Observable that emits a trimmed string
 */
export function trim(): MonoTypeOperatorFunction<string> {
  return (source) => source.pipe(map((value) => value.trim()));
}
