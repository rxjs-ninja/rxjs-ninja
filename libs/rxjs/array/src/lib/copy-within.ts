/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable array from `Array.prototype.copyWithin` (mutates a copy of the source, not the original).
 *
 * @category Modify
 *
 * @typeParam T Item type contained in the Array or Set
 *
 * @param target Index to copy to
 * @param start Index to start copying from
 * @param end Optional index to stop copying (exclusive)
 *
 * @returns An Observable that emits the copied array
 */
export function copyWithin<T extends unknown>(
  target: Subscribable<number> | number,
  start: Subscribable<number> | number,
  end?: Subscribable<number> | number,
): OperatorFunction<Iterable<T>, T[]> {
  const target$ = createOrReturnObservable(target);
  const start$ = createOrReturnObservable(start);
  if (end === undefined) {
    return (source) =>
      source.pipe(
        withLatestFrom(target$, start$),
        map(([value, targetValue, startValue]) => [...value].copyWithin(targetValue, startValue)),
      );
  }
  const end$ = createOrReturnObservable(end);
  return (source) =>
    source.pipe(
      withLatestFrom(target$, start$, end$),
      map(([value, targetValue, startValue, endValue]) =>
        [...value].copyWithin(targetValue, startValue, endValue),
      ),
    );
}
