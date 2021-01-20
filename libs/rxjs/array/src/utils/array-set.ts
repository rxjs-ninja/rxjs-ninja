/**
 * @packageDocumentation
 * @module Array
 */

/**
 * Returns if the input is an array or
 * @private
 * @internal
 * @param input
 */
export function isArrayOrSet(input: unknown): input is Iterable<unknown> {
  if (Array.isArray(input)) {
    return true;
  } else return input instanceof Set;
}

/**
 * Flat map a set
 * @private
 * @internal
 * @param input
 */
export function flatMapSet<T extends unknown>(input: Iterable<Set<T>> | Set<T>): T[][] {
  return Array.isArray(input) ? ([...input.map((set) => [...set])] as T[][]) : ([[...input]] as T[][]);
}

/**
 * Flat map a set
 * @private
 * @internal
 * @param input
 */
export function flatMapMap<K extends unknown, V extends unknown>(input: Iterable<Map<K, V>> | Map<K, V>): [K, V][] {
  return Array.isArray(input) ? ([...input.map((map) => [...map])] as [K, V][]) : ([[...input]] as [K, V][]);
}
