import { ObservableInput } from 'rxjs';

/**
 * A single value or a list of values. Used by operators that accept either a scalar
 * or an array of search values without treating strings as iterables of characters.
 */
export type ScalarOrList<T> = T | readonly T[];

export type ScalarOrListInput<T> = ObservableInput<ScalarOrList<T>> | ScalarOrList<T>;

export function isSearchList<T>(input: ScalarOrList<T>): input is readonly T[] {
  return Array.isArray(input) || input instanceof Set;
}
