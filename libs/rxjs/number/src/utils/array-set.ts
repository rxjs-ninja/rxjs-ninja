/**
 * @packageDocumentation
 * @module Number
 */

/**
 * Returns if the input is an array or
 * @private
 * @internal
 * @param input
 */
export function isArrayOrSet<T extends unknown>(input: unknown): input is Iterable<T> {
  if (Array.isArray(input)) {
    return true;
  } else return input instanceof Set;
}
