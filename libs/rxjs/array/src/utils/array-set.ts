/**
 * @packageDocumentation
 * @module Array
 */

/**
 * Checks if an Iterable is only one of `Array` or `Set`
 * @private
 * @internal
 * @param input
 */
export function isArrayOrSet(input: unknown): input is Iterable<unknown> {
  if (Array.isArray(input)) {
    return true;
  } else return input instanceof Set;
}
