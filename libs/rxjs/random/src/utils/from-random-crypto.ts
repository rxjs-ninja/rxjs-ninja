/**
 * @packageDocumentation
 * @module Random
 */

import { FromRandomCryptoOpts, TypedArray } from '../types/from-random-crypto';
/**
 * Default options for [[fromRandomCrypto]]
 * @internal
 */
export const RND_CRYPTO_DEFAULTS: FromRandomCryptoOpts = {
  /**
   * Default length of number generated is `4-bytes`
   */
  bytes: 4,
  /**
   * By default values are signed
   */
  unsigned: false,
};

/**
 * @private
 * @internal
 * @param bytes
 * @param unsigned
 */
export function getIntTypedArray(bytes: number, unsigned?: boolean): TypedArray {
  if (bytes === 1) {
    return unsigned ? new Uint8Array(1) : new Int8Array(1);
  } else if (bytes === 2) {
    return unsigned ? new Uint16Array(1) : new Int16Array(1);
  }
  return unsigned ? new Uint32Array(1) : new Int32Array(1);
}
