/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

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
  maxLength: number | ObservableInput<number>,
  fillString?: string | ObservableInput<string>,
): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) =>
    source.pipe(
      withLatestFrom(
        (isObservable(maxLength) ? maxLength : of(maxLength)) as Observable<number>,
        (isObservable(fillString) ? fillString : of(fillString)) as Observable<string>,
      ),
      map(([value, maxLenInput, fillInput]) => value.padStart(maxLenInput, fillInput)),
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
  maxLength: number | ObservableInput<number>,
  fillString?: string | ObservableInput<string>,
): MonoTypeOperatorFunction<string> {
  const maxLength$ = (isObservable(maxLength) ? maxLength : of(maxLength)) as Observable<number>;
  const fillString$ = (isObservable(fillString) ? fillString : of(fillString)) as Observable<string>;
  return (source: Observable<string>) =>
    source.pipe(
      withLatestFrom(maxLength$, fillString$),
      map(([value, maxLenInput, fillInput]) => value.padEnd(maxLenInput, fillInput)),
    );
}
