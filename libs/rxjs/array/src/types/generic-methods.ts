/**
 * @packageDocumentation
 * @module Array
 */

/**
 * A function to use with [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
 *
 * @typeParam T The type of the value to be modified for comparison
 * @typeParam K The type of the value returned by the function
 *
 * @param value The value to be passed
 *
 * @internal
 */

export type MapFn<T = unknown, K = unknown> = (value: T) => K;

/**
 * A predicate function is used with filtering and should return a boolean based on an equality check.
 *
 * Can be used for more complex conditions
 *
 * @typeParam T The type of the value to do an equality check with
 *
 * @internal
 */
export type PredicateFn<T = unknown> = (...args: T[]) => boolean;

/**
 * Method used to sort an Array of values
 *
 * @typeParam T The Type of the value to sort
 *
 * @internal
 */

export type SortFn<T = unknown> = (first: T, second: T) => number;
