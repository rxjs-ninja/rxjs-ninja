/**
 * @packageDocumentation
 * @module Array
 */

/**
 * A map function is used to convert values, usually using Array.map - the values can be of the same type (such as multiplying
 * and number or using String.toUpperCase) or it can change to a different value (using Number.parseInt or Number.toString)
 *
 * @internal
 *
 * @typeParam T The type of the value from the input source
 * @typeParam K The type of the returned from the new Observable source
 *
 * @param value The value to be converted
 *
 * @returns A value that has been mapped to a new value
 */

export type MapFn<T = unknown, K = T | unknown> = (value: T) => K;

/**
 * A predicate function is used when you need a boolean check of a value, usually with Array.filter or Array.find
 *
 * @internal
 *
 * @typeParam T The type of the value being checked
 *
 * @param args The arguments for the function
 *
 * @returns A boolean value from the value being checked in the predicate
 *
 */
export type PredicateFn<T extends unknown> = (...args: T[]) => boolean;

/**
 * A sort function is used with Array.sort to order array items and returns a number for the sorting position order
 * of an item. Usually is provided when working with more complex objects or tuples
 *
 * @internal
 *
 * @typeParam T The Type of the value to sort
 *
 * @param first The first value to compare
 * @param second The second value to compare
 *
 * @returns A number based on the new position in the array the item should move to
 */

export type SortFn<T extends unknown> = (first: T, second: T) => number;
