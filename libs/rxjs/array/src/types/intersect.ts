/**
 * @packageDocumentation
 * @module array
 */

/**
 * Method used to change value, can be used to change type
 *
 * @typeParam T The type of the value to be changed
 * @typeParam K The type of the value once it has been changed
 *
 * @param value The value to be changed
 *
 */
export type MutateValueFn<T, K> = (value: T) => K;

/**
 * A predicate function that take a value from `filter` and returns a boolean
 * based on an equality check
 *
 * @typeParam T The type of the value to do an equality check with
 *
 * @example
 * ```
 * const isEvenNumber: PredicateFn<number> = (num: number) => num % 2 === 0
 * ```
 *
 * @returns Boolean value
 */
export type PredicateFn<T> = (value: T, value2: T) => boolean;
