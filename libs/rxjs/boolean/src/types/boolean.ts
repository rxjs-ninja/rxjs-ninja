/**
 * @packageDocumentation
 * @module Boolean
 */

/**
 * A function that takes one or more parameters and returns a boolean value based on the function calculation
 *
 * @typeParam T The type of the value being checked
 *
 * @example
 * Return is a number is boolean `true`
 * ```ts
 * const isTruthy: PredicateFn<number> = (item: number) => Boolean(number);
 * ```
 *
 * @example
 * Return is a number is greater than 10
 * ```ts
 * const isTruthy: PredicateFn<number> = (item: number) => item > 10;
 * ```
 *
 * @example
 * Return if two numbers match
 * ```ts
 * const isTruthy: PredicateFn<number> = (item1: number, item2: number) => item1 === item2;
 * ```
 */
export type PredicateFn<T extends unknown> = (...args: T[]) => boolean;
