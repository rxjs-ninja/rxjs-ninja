/**
 * @packageDocumentation
 * @module Boolean
 */

import { ArrayOrSet } from '../types/array-set';

/**
 * Returns if the input is an array or
 * @private
 * @internal
 * @param input
 */
export function isArrayOrSet(input: unknown): input is ArrayOrSet<unknown> {
  if (Array.isArray(input)) {
    return true;
  } else return input instanceof Set;
}
