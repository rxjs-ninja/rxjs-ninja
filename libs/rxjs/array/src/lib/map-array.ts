/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapFn } from '../types/generic-methods';

/**
 * Returns an Observable array produced by mapping each element using `Array.prototype.map`.
 *
 * @category Modify
 *
 * @remarks This is the ECMAScript Array `map` method, not the RxJS `map` operator.
 *
 * @typeParam T Source element type
 * @typeParam K Mapped element type
 *
 * @param mapFn [[MapFn]] applied to each element
 *
 *
 * @example
 * Double each number in an array emission
 * ```ts
 * of([1, 2, 3]).pipe(mapArray((n) => n * 2)).subscribe();
 * ```
 * Output: `[2, 4, 6]`
 * @returns An Observable that emits the mapped array
 */
export function mapArray<T extends unknown, K extends unknown>(
  mapFn: MapFn<T, K>,
): OperatorFunction<Iterable<T>, K[]> {
  return (source) => source.pipe(map((value) => [...value].map(mapFn)));
}
