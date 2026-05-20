import { PredicateFn } from '../types/generic-methods';

/**
 * @private
 * @internal
 */
export function matchPredicate<T extends unknown>(value: T, predicate?: PredicateFn<T>): boolean {
  if (predicate && typeof value === 'number') {
    return predicate(value);
  }
  return predicate ? Boolean(value) && predicate(value) : Boolean(value);
}
