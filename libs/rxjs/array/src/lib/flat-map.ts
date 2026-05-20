/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapFn } from '../types/generic-methods';

/**
 * Returns an Observable Array produced by mapping each element to zero or more values and flattening the result using
 * Array.prototype.flatMap.
 *
 * @category Modify
 *
 * @typeParam T Item type contained in the source
 * @typeParam K Item type in the flattened result
 *
 * @param mapper Function that returns a value or array of values for each element
 *
 * @example
 * Maps strings to their characters and flattens
 * ```ts
 * const input = ['ab', 'cd'];
 * of(input).pipe(flatMap((v) => [...v])).subscribe();
 * ```
 * Output: `'a', 'b', 'c', 'd'`
 *
 * @returns An Observable that emits the flat-mapped array
 */
export function flatMap<T extends unknown, K extends unknown>(
  mapper: MapFn<T, K | readonly K[]>,
): OperatorFunction<Iterable<T>, K[]> {
  return (source) =>
    source.pipe(
      map((value) =>
        [...value].flatMap((item) => {
          const mapped = mapper(item);
          return Array.isArray(mapped) ? mapped : [mapped];
        }),
      ),
    );
}
