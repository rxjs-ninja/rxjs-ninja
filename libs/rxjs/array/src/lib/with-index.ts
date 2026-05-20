/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable array with a single element replaced using `Array.prototype.with` (non-mutating).
 *
 * @category Modify
 *
 * @typeParam T Item type contained in the Array or Set
 *
 * @param index Index to replace (supports negative indices)
 * @param value Replacement value
 *
 * @returns An Observable that emits the updated array
 */
export function withIndex<T extends unknown>(
  index: Subscribable<number> | number,
  value: Subscribable<T> | T,
): OperatorFunction<Iterable<T>, T[]> {
  const index$ = createOrReturnObservable(index);
  const value$ = createOrReturnObservable(value);
  return (source) =>
    source.pipe(
      withLatestFrom(index$, value$),
      map(([sourceValue, indexValue, replaceValue]) => [...sourceValue].with(indexValue, replaceValue)),
    );
}
