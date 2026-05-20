/**
 * @packageDocumentation
 * @module Array
 */

/**
 * An {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array | Array}
 * or {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set | Set}
 * collection. Most operators in this package accept any `Iterable` source but return arrays; this type documents the
 * common Array/Set inputs used with compare and seed parameters.
 *
 * @typeParam T The element type of the collection
 */
export type ArrayOrSet<T> = Array<T> | Set<T>;

/**
 * Returns whether `input` is an Array or a Set (and not another iterable such as a Map or string).
 *
 * @typeParam T The expected element type when narrowing
 *
 * @param input Value to test
 */
export function isArrayOrSet<T extends unknown>(input: unknown): input is ArrayOrSet<T> {
  return Array.isArray(input) || input instanceof Set;
}
