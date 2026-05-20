/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { GroupByFn } from '../types/group-by';

/**
 * Returns an Observable Map grouping source elements using `Map.groupBy`.
 *
 * @category Map
 *
 * @typeParam T Element type
 * @typeParam K Map key type for each group
 *
 * @param keyFn [[GroupByFn]] returning a key for each element
 *
 * @returns An Observable that emits a Map of grouped arrays
 */
export function mapGroupBy<T extends unknown, K extends PropertyKey>(
  keyFn: GroupByFn<T, K>,
): OperatorFunction<Iterable<T>, Map<K, T[]>> {
  return (source) => source.pipe(map((value) => Map.groupBy([...value], keyFn)));
}
