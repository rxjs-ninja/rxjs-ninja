/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string that is a partial slice of the source string using String.substring
 *
 * @category String Modify
 *
 * @param indexStart The index of the first character to include in the returned substring.
 * @param indexEnd Optional The index of the first character to exclude from the returned substring.
 *
 * @example
 * Return a string from index `0` to `4`
 * ```ts
 * of('RxJS Ninja').pipe(substring(0, 4)).subscribe();
 * ```
 * Output: `RxJS`
 *
 * @example
 * Return a string from index `5` to the end of the string
 * ```ts
 * of('RxJS Ninja').pipe(substring(5)).subscribe();
 * ```
 * Output: `Ninja`
 *
 * @returns Observable that emits a string that is a substring of the source string
 */
export function substring(
  indexStart: number | ObservableInput<number>,
  indexEnd?: number | ObservableInput<number>,
): MonoTypeOperatorFunction<string> {
  return (source) =>
    source.pipe(
      withLatestFrom(
        (isObservable(indexStart) ? indexStart : of(indexStart)) as Observable<number>,
        (isObservable(indexEnd) ? indexEnd : of(indexEnd)) as Observable<number>,
      ),
      map(([value, start, end]) => value.substring(start, end)),
    );
}
