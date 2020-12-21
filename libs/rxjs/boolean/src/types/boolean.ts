/**
 * @packageDocumentation
 * @module Boolean
 */

/**
 * A predicate function is used when you need a boolean check of a value, usually with Array.filter or Array.find
 *
 * **Default predicate function:**
 * ```ts
 * function defaultPredicateFn(item: unknown): boolean {
 *  return Boolean(item);
 * }
 * ```
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
