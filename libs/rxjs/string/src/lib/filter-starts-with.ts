/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string where the source string starts with the passed string using
 * String.startsWith
 *
 * @category Filter
 *
 * @see The [[startsWith]] operator returns the boolean value
 *
 * @param start The string to check the source starts with
 * @param startFrom Optional index to start the check from
 *
 * @example
 * Return a string where the source string starts with the `N` character
 * ```ts
 * from(['RxJS', 'Ninja', 'Tests']).pipe(filterStartsWith('N')).subscribe();
 * ```
 * Output: `Ninja`
 *
 * @example
 * Return a string where the source string starts with `t` character from index `3`
 * ```ts
 * from(['RxJS', 'Ninja', 'Tests']).pipe(filterStartsWith('t', 3)).subscribe();
 * ```
 * Output: `Tests`
 *
 * @returns Observable that emits a string
 */
export function filterStartsWith(
  start: string | ObservableInput<string>,
  startFrom?: number | ObservableInput<number>,
): MonoTypeOperatorFunction<string> {
  const start$ = (isObservable(start) ? start : of(start)) as Observable<string>;
  const startFrom$ = (isObservable(startFrom) ? startFrom : of(startFrom)) as Observable<number>;
  return (source) =>
    source.pipe(
      withLatestFrom(start$, startFrom$),
      map(([value, startInput, startFromInput]) => (value.startsWith(startInput, startFromInput) ? value : '')),
      filter((value) => Boolean(value)),
    );
}
