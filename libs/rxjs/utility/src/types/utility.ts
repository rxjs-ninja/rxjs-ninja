/**
 * @packageDocumentation
 * @module utility
 */

/**
 * A simple callback function that can take a value and returns a void
 */
export type CallbackFn<T = unknown> = (value?: T) => void;

/**
 * A predicate function that returns a boolean value
 *
 * @example
 * ```
 * const isEvenNumber: PredicateFn = (num: number): boolean => num % 2 === 0
 * ```
 *
 * @returns Boolean value
 */
export type PredicateFn<T extends unknown> = (...args: T[]) => boolean;

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
export type InputModifierFn<T extends unknown, K extends unknown> = (value: T) => K;
