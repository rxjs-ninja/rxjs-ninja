/**
 * @packageDocumentation
 * @module Array
 */

/**
 * An Array-like interface that is an array of items or a set of items
 *
 * @internal
 *
 * @typeParam T The type of the value from the input source
 */
export type ArrayOrSet<T> = T[] | Set<T>;
