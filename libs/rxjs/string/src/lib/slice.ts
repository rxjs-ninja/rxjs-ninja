/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string that is a partial slice of the source string using String.slice
 *
 * @category String Modify
 *
 * @remarks For creating substrings use [[substring]] as a better alternative to `slice`
 *
 * @param startIndex The start index for the substring
 * @param endIndex Optional end index for the length of substring, if not passed slice will use `str.length -1`
 *
 * @example
 * Return a string from index `0` to `4`
 * ```ts
 * of('RxJS Ninja').pipe(slice(0, 4)).subscribe();
 * ```
 * Output: `RxJS`
 *
 * @example
 * Return a string from index `5` to the end of the string
 * ```ts
 * of('RxJS Ninja').pipe(slice(5)).subscribe();
 * ```
 * Output: `Ninja`
 *
 * @returns Observable that emits a string that is a slice of the source string
 */
export function slice(
  startIndex: number | ObservableInput<number>,
  endIndex?: number | ObservableInput<number>,
): MonoTypeOperatorFunction<string> {
  const startIndex$ = (isObservable(startIndex) ? startIndex : of(startIndex)) as Observable<number>;
  const endIndex$ = (isObservable(endIndex) ? endIndex : of(endIndex)) as Observable<number>;
  return (source: Observable<string>) =>
    source.pipe(
      withLatestFrom(startIndex$, endIndex$),
      map(([value, startInput, endInput]) => value.slice(startInput, endInput)),
    );
}
