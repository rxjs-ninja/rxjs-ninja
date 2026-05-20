/**
 * @packageDocumentation
 * @module Array
 */
import { ObservableInput } from 'rxjs';

/**
 * A single search value or a list of values. Used by [[indexOf]] and [[lastIndexOf]] so that string inputs are treated
 * as a single scalar value rather than as an iterable of characters.
 *
 * @typeParam T The search value type
 */
export type ScalarOrList<T> = T | readonly T[];

/**
 * A scalar or list of search values, optionally wrapped in an Observable (see `ObservableInput` from RxJS).
 *
 * @typeParam T The search value type
 */
export type ScalarOrListInput<T> = ObservableInput<ScalarOrList<T>> | ScalarOrList<T>;

/**
 * Returns whether `input` should be searched as multiple values (array or Set) rather than as a single scalar.
 *
 * @remarks Strings are never treated as lists of characters. Only `Array` and `Set` instances return `true`.
 *
 * @typeParam T The search value type
 *
 * @param input Value to test
 */
export function isSearchList<T>(input: ScalarOrList<T>): input is readonly T[] {
  return Array.isArray(input) || input instanceof Set;
}
