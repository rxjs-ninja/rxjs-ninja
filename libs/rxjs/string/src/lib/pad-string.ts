/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string where the source string has been padded using String.padStart
 *
 * @category String Modify
 *
 * @alias `padLeft`
 *
 * @param maxLength The maximum length to pad the string to
 * @param fillString Optional string to use as the string padding
 *
 * @example
 * Returns a string padded to a length of `12` with default fill string
 * ```ts
 * of('RxJS Ninja').pipe(padStart(12)).subscribe();
 * ```
 * Output: `'  RxJS Ninja'`
 *
 *
 * @example
 * Returns a string padded to a length of `12` with `.` fill string
 * ```ts
 * of('12345').pipe(padStart(12, '.')).subscribe();
 * ```
 * Output: `'..RxJS Ninja'`
 *
 * @returns Observable that emits a string that is padded to the passed length
 */
export function padStart(maxLength: number, fillString?: string): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.padStart(maxLength, fillString)));
}

/**
 * Returns an Observable that emits a string where the source string has been padded using String.padEnd
 *
 * @category String Modify
 *
 * @alias `padRight`
 *
 * @param maxLength The maximum length to pad the string to
 * @param fillString Optional string to use as the string padding
 *
 * @example
 * Returns a string padded to a length of `12` with default fill string
 * ```ts
 * of('RxJS Ninja').pipe(padEnd(12)).subscribe();
 * ```
 * Output: `'RxJS Ninja  '`
 *
 *
 * @example
 * Returns a string padded to a length of `12` with `.` fill string
 * ```ts
 * of('12345').pipe(padEnd(12, '.')).subscribe();
 * ```
 * Output: `'RxJS Ninja..'`
 *
 * @returns Observable that emits a string that is padded to the passed length
 */
export function padEnd(maxLength: number, fillString?: string): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.padEnd(maxLength, fillString)));
}
