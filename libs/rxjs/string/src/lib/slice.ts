/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a string that is a partial slice of the source string using String.slice
 *
 * @category Modify
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
  startIndex: Subscribable<number> | number,
  endIndex?: Subscribable<number> | number,
): MonoTypeOperatorFunction<string> {
  const startIndex$ = createOrReturnObservable(startIndex);
  const endIndex$ = createOrReturnObservable(endIndex);
  return (source) =>
    source.pipe(
      withLatestFrom(startIndex$, endIndex$),
      map(([value, startIndexValue, endIndexValue]) => value.slice(startIndexValue, endIndexValue)),
    );
}
