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
export type InputModifierFn<T = any, K = any> = (value: T) => K;

/**
 * Method used to sort an Array of values
 *
 * @typeParam T The Type of the value to sort
 *
 * @param first The first value to compare
 * @param second The second value to compare
 *
 * @example
 * ```ts
 * const sortFn<string> = (first: string, second: string): number => first.localCompare(second)
 * ```
 *
 * @returns A number that represents the value match position for sorting
 */

export type SortFn<T = any> = (first: T, second: T) => number; // eslint-disable-line
