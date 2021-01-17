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
export function isArrayOrSet(input: unknown): input is ArrayLike<unknown> {
  if (Array.isArray(input)) {
    return true;
  } else return input instanceof Set;
}
