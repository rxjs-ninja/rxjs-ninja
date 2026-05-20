/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { GroupByFn } from '../types/group-by';

/**
 * Returns an Observable record grouping source elements using `Object.groupBy`.
 *
 * @category Object
 *
 * @typeParam T Element type
 * @typeParam K Property key type used as group names
 *
 * @param keyFn [[GroupByFn]] returning a property key for each element
 *
 *
 * @example
 * Group strings by length
 * ```ts
 * of(['x', 'xy', 'y']).pipe(objectGroupBy((s) => s.length)).subscribe();
 * ```
 * Output: `{ 1: ['x', 'y'], 2: ['xy'] }`
 * @returns An Observable that emits a record of grouped arrays
 */
export function objectGroupBy<T extends unknown, K extends PropertyKey>(
  keyFn: GroupByFn<T, K>,
): OperatorFunction<Iterable<T>, Partial<Record<K, T[]>>> {
  return (source) => source.pipe(map((value) => Object.groupBy([...value], keyFn)));
}
