/**
 * @packageDocumentation
 * @module array
 */

/**
 * Method used to modify the input value for comparison
 *
 * @typeParam T The type of the value to be modified for comparison
 * @typeParam K The type of the value returned by the function
 *
 * @param value The value to be modified for comparison
 *
 * @example
 * ```ts
 * const modify: InputModifierFn<T> = (value: string): string => value.toUpperCase()
 * ```
 *
 * @example
 * ```ts
 * const modify: InputModifierFn<T, K> = (value: string): number => parseInt(value, 10)
 * ```
 *
 * @returns Value of the modifier function
 */
export type InputModifierFn<T, K> = (value: T) => K;

/**
 * A predicate function that take a value from `filter` and returns a boolean
 * based on an equality check
 *
 * @typeParam T The type of the value to do an equality check with
 *
 * @example
 * ```ts
 * const isEvenNumber: PredicateFn<number> = (num: number): boolean => num % 2 === 0
 * ```
 *
 * @returns Boolean value
 */
export type PredicateFn<T> = (value: T, value2: T) => boolean;
