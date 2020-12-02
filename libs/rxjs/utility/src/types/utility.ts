/**
 * @packageDocumentation
 * @module Utility
 */

import { ObservableInput } from 'rxjs';

/**
 * A simple callback function that can take a value and returns a void
 */
export type CallbackFn<T extends unknown> = (value?: T) => void;

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

/**
 * Method used to map one value to another value
 *
 * @typeParam T The type of the value to be modified for comparison
 * @typeParam K The type of the value returned by the function
 *
 * @param value The value to be modified for comparison
 *
 * @example
 * ```ts
 * const modify: MapFn<string> = (value: string): string => value.toUpperCase()
 * ```
 *
 * @example
 * ```ts
 * const modify: MapFn<string, number> = (value: string): number => parseInt(value, 10)
 * ```
 *
 * @returns Value of the modifier function
 */
export type MapFn<T = unknown, K = T | unknown> = (value: T) => K;

/**
 * A function passed to [[debounceWithQuery]] as the second parameter, takes a string
 * parameter and returns an Observable value from a server response.
 *
 * @typeParam T The response from an API which returns the result of a query
 *
 * @param query The string to send to the query method
 */
export type QueryMethod<T = unknown> = (query: string) => ObservableInput<T>;
