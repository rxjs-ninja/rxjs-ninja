/**
 * @packageDocumentation
 * @module Array
 */

/**
 * Function that returns a key for each element in a `groupBy` operation.
 *
 * @typeParam T The element type being grouped
 * @typeParam K The property key type returned for grouping
 */
export type GroupByFn<T extends unknown, K extends PropertyKey> = (item: T, index: number) => K;
