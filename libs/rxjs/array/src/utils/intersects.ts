/**
 * @packageDocumentation
 * @module Array
 */
import { MapFn, PredicateFn } from '../types/generic-methods';

/**
 * Filter an array to find intersecting items with optional predicate method, otherwise
 * uses simple comparison
 * @param input The input array of values to check against the source
 * @param predicate Optional method for comparison
 *
 * @returns Function that is used with RxJS map method
 * @private
 * @internal
 */
export function mapIntersectsWith<T = unknown>(input: T[], predicate?: PredicateFn<T>): (value: T[]) => T[] {
  return (value: T[]): T[] => {
    return value.filter(
      (sourceValue) =>
        input.findIndex((checkValue) =>
          predicate ? predicate(sourceValue, checkValue) : sourceValue === checkValue,
        ) !== -1,
    );
  };
}

/**
 * Return a method that's used to check that two arrays have intersecting members,
 * takes an optional method that allows methods to be mutated
 *
 * @param checkArray
 * @param mutate
 * @private
 * @internal
 */
export function mapIntersection<T = unknown, K = unknown>(
  checkArray: T[],
  mutate?: MapFn<T, T | K>,
): (value: T[]) => T[] {
  if (mutate) {
    const checkSet = new Set(checkArray.map<T | K>(mutate));
    return (value: T[]) => [...new Set<T>(value)].filter((x) => checkSet.has(mutate(x)));
  } else {
    const checkSet = new Set(checkArray);
    return (value: T[]) => [...new Set<T>(value)].filter((x) => checkSet.has(x));
  }
}
