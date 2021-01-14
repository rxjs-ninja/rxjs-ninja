/**
 * @packageDocumentation
 * @module Array
 */
import { PredicateFn } from '../types/generic-methods';

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
 * @private
 * @internal
 */
export function mapIntersection<T extends unknown>(checkArray: T[]): (value: T[]) => T[] {
  const checkSet = new Set<T>(checkArray);
  return (value: T[]) => [...new Set<T>(value)].filter((x) => checkSet.has(x));
}
