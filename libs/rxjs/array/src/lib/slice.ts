/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable Array containing a shallow copy of a portion of the source using Array.prototype.slice.
 *
 * @category Modify
 *
 * @typeParam T Item type contained in the Array or Set
 *
 * @param start Optional start index (inclusive)
 * @param end Optional end index (exclusive)
 *
 * @example
 * Returns a slice of the source array
 * ```ts
 * const input = ['a', 'b', 'c', 'd'];
 * of(input).pipe(slice(1, 3)).subscribe();
 * ```
 * Output: `'b', 'c'`
 *
 * @returns An Observable that emits the sliced array
 */
export function slice<T extends unknown>(
  start?: Subscribable<number> | number,
  end?: Subscribable<number> | number,
): OperatorFunction<Iterable<T>, T[]> {
  if (start === undefined && end === undefined) {
    return (source) => source.pipe(map((value) => [...value].slice()));
  }
  if (end === undefined) {
    const start$ = createOrReturnObservable(start as Subscribable<number> | number);
    return (source) =>
      source.pipe(
        withLatestFrom(start$),
        map(([value, startValue]) => [...value].slice(startValue)),
      );
  }
  const start$ = createOrReturnObservable(start ?? 0);
  const end$ = createOrReturnObservable(end);
  return (source) =>
    source.pipe(
      withLatestFrom(start$, end$),
      map(([value, startValue, endValue]) => [...value].slice(startValue, endValue)),
    );
}
