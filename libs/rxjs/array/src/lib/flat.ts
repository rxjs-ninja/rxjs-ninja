/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable Array flattened to the given depth using Array.prototype.flat.
 *
 * @category Modify
 *
 * @typeParam T Item type contained in the Array
 *
 * @param depth Depth to flatten (default `1`)
 *
 * @example
 * Flattens a nested array one level
 * ```ts
 * const input = [1, [2, 3]];
 * of(input).pipe(flat()).subscribe();
 * ```
 * Output: `1, 2, 3`
 *
 * @returns An Observable that emits the flattened array
 */
export function flat<T extends unknown>(
  depth: Subscribable<number> | number = 1,
): OperatorFunction<Iterable<T | Iterable<T>>, T[]> {
  const depth$ = createOrReturnObservable(depth);
  return (source) =>
    source.pipe(
      withLatestFrom(depth$),
      map(([value, depthValue]) => [...value].flat(depthValue) as T[]),
    );
}
