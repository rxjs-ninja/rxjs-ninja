/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from 'libs/rxjs/string/src/utils/internal';

/**
 * Returns an Observable that emits a string that is a partial slice of the source string using String.substring
 *
 * @category Modify
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
  indexStart: Subscribable<number> | number,
  indexEnd?: Subscribable<number> | number,
): MonoTypeOperatorFunction<string> {
  const indexStart$ = createOrReturnObservable(indexStart);
  const indexEnd$ = createOrReturnObservable(indexEnd);
  return (source) =>
    source.pipe(
      withLatestFrom(indexStart$, indexEnd$),
      map(([value, startValue, endValue]) => value.substring(startValue, endValue)),
    );
}
