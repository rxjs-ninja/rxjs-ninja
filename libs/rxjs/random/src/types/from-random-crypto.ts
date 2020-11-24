/**
 * @packageDocumentation
 * @module Random
 */

/**
 * Options for generating a number from `Crypto` module
 */
export interface FromRandomCryptoOpts {
  /**
   * Number of bytes to determine the [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays#Typed_array_views) view to use.
   * Default is `4`
   */
  bytes: 1 | 2 | 4;
  /**
   * If the array should be signed or unsigned. Default is `false`.
   */
  unsigned?: boolean;
}
