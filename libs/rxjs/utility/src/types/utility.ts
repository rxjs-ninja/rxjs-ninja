/**
 * @packageDocumentation
 * @module Utility
 */

import { ObservableInput } from 'rxjs';

/**
 * A callback function that is called with `0...n` arguments
 *
 * @internal
 *
 * @typeParam T The type of the value from a source
 *
 * @params args Arguments passed to the callback
 *
 * @returns void
 */
export type CallbackFn<T extends unknown> = (...args: T[]) => void;

/**
 * A predicate function is used when you need a boolean check of a value, usually with Array.filter or Array.find
 *
 * **Example predicate function:**
 * ```ts
 * function isGreaterThan5(item: unknown): boolean {
 *  return typeof item === 'number' && item > 5
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

/**
 * A map function is used to convert values, usually using Array.map - the values can be of the same type (such as multiplying
 * and number or using String.toUpperCase) or it can change to a different value (using Number.parseInt or Number.toString)
 *
 * **Example map functions:**
 * ```ts
 * function mapToUpperCase(str: string): string {
 *  return str.toUpperCase();
 * }
 *
 * function mapToInteger (str: string): number {
 *  return parseInt(str, 10);
 * }
 *```
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
 * A function passed to [[debounceWithQuery]] as the second parameter, takes a string and returns an Observable source
 *
 * @internal
 *
 * @typeParam T The response from an API which returns the result of a query
 *
 * @param query The string to send to the query method
 */
export type QueryMethod<T = unknown> = (query: string) => ObservableInput<T>;
