/**
 * @packageDocumentation
 * @module array
 */
import { MutateValueFn, PredicateFn } from '../types/intersect';

export function mapIntersectsWith<T>(input: T[], predicate?: PredicateFn<T>) {
  return (value: T[]): T[] => {
    return value.filter(
      (sourceValue) =>
        input.findIndex((checkValue) => (predicate ? predicate(sourceValue, checkValue) : sourceValue === checkValue)) !== -1,
    );
  };
}

export function mapIntersection<T, K>(checkArray: T[], mutate?: MutateValueFn<T, T | K>) {
  if (mutate) {
    const checkSet = new Set(checkArray.map<T | K>(mutate));
    return (value) => [...new Set<T>(value)].filter((x) => checkSet.has(mutate(x)));
  } else {
    const checkSet = new Set(checkArray);
    return (value) => [...new Set<T>(value)].filter((x) => checkSet.has(x));
  }
}
