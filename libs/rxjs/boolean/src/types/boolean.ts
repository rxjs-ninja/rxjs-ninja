/**
 * @packageDocumentation
 * @module boolean
 */

/**
 * A predicate function is used with filtering and should return a boolean based on an equality check.
 *
 * Can be used for more complex conditions
 *
 * @typeParam T The type of the value to do an equality check with
 *
 * @example
 * ```ts
 * const isEvenNumber: PredicateFn<number> = (num: number): boolean => num % 2 === 0
 * ```
 *
 * @example
 * ```ts
 * interface ObjectType {
 *   foo: number,
 *   bar: string
 * }
 * const isTheUltimateAnswer: PredicateFn<ObjectType> = (obj: ObjectType): boolean => obj.foo === 42
 * ```
 *
 * @example
 * ```ts
 * const nameIsAfter: PredicateFn<string, string> = (name1: string, name2: string): boolean => name1.localeCompare(name2) === 0
 * ```
 *
 * @returns Boolean value based on the condition of the function
 */
export type PredicateFn<T extends unknown> = (...args: T[]) => boolean;
