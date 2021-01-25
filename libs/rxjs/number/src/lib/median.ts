/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map } from 'rxjs/operators';
import { roundTo } from './round-to';

/**
 * Returns an Observable that emits the median number value from an Iterable of numbers
 *
 * @category Distribution
 *
 * @example
 * Return the median of the source number Array
 * ```ts
 * const source$ = from([ [1, 2, 3], [10, 15, 8], [5, 10, 100] ]);
 *
 * source$.pipe(median()).subscribe();
 * ```
 * Output: `2, 15, 52.5`
 *
 * @returns Observable that emits a number that is the median value in the source Iterable
 */
export function median(precision: Subscribable<number> | number = 3): OperatorFunction<Iterable<number>, number> {
  return (source) =>
    source.pipe(
      map<Iterable<number>, [number[], number]>(([...value]) => [value.sort(), Math.ceil(value.length / 2)]),
      map<[number[], number], number>(([value, mid]) =>
        value.length % 2 === 0 ? (value[mid] + value[mid - 1]) / 2 : value[mid - 1],
      ),
      roundTo(precision),
    );
}
