/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a string where the source string has been padded using String.padStart
 *
 * @category Modify
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
export function padStart(
  maxLength: Subscribable<number> | number,
  fillString?: Subscribable<string> | string,
): MonoTypeOperatorFunction<string> {
  const maxLength$ = createOrReturnObservable(maxLength);
  const fillString$ = createOrReturnObservable(fillString);
  return (source: Observable<string>) =>
    source.pipe(
      withLatestFrom(maxLength$, fillString$),
      map(([value, maxLengthValue, fillStringValue]) => value.padStart(maxLengthValue, fillStringValue)),
    );
}

/**
 * Returns an Observable that emits a string where the source string has been padded using String.padEnd
 *
 * @category Modify
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
export function padEnd(
  maxLength: Subscribable<number> | number,
  fillString?: Subscribable<string> | string,
): MonoTypeOperatorFunction<string> {
  const maxLength$ = createOrReturnObservable(maxLength);
  const fillString$ = createOrReturnObservable(fillString);
  return (source) =>
    source.pipe(
      withLatestFrom(maxLength$, fillString$),
      map(([value, maxLengthValue, fillStringValue]) => value.padEnd(maxLengthValue, fillStringValue)),
    );
}
