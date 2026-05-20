/**
 * @packageDocumentation
 * @module Array
 */

/**
 * A key/value tuple used when converting between arrays and
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map | Map} or
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object | Object} values.
 *
 * @typeParam K The key type
 * @typeParam V The value type
 */
export type MapEntry<K extends unknown = unknown, V extends unknown = unknown> = [K, V];
