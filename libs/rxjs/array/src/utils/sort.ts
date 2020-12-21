/**
 * Default sort method that provides a number value of comparison order
 * @private
 * @ignore
 * @param first The first comparison parameter
 * @param second The second comparison parameter
 *
 * @returns Number related to the sort order of two comparison parameters
 */
export function defaultSortFn<T extends unknown>(first: T, second: T): number {
  if (typeof first === 'string') {
    return first.localeCompare(second as string);
  }
  if (first === second) return 0;
  return first < second ? -1 : 1;
}
