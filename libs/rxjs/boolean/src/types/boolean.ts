/**
 * @packageDocumentation
 * @module boolean
 */

/**
 * A predicate function that take a value from `filter` and returns a boolean
 * based on an equality check
 *
 * @typeParam T The type of the value to do an equality check with
 *
 * @example
 * ```
 * const isEvenNumber: PredicateFn<number> = (num: number): boolean => num % 2 === 0
 * ```
 *
 * @returns Boolean value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FilterPredicateFn = (...args: any) => boolean;
