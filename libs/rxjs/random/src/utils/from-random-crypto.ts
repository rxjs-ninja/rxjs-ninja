/**
 * @packageDocumentation
 * @module Random
 */

import { FromRandomCryptoOpts } from '../types/from-random-crypto';
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
export function getIntTypedArray(
  bytes: number,
  unsigned?: boolean,
):
  | Int8Array<ArrayBuffer>
  | Uint8Array<ArrayBuffer>
  | Int16Array<ArrayBuffer>
  | Uint16Array<ArrayBuffer>
  | Int32Array<ArrayBuffer>
  | Uint32Array<ArrayBuffer> {
  const buffer = new ArrayBuffer(bytes);
  if (bytes === 1) {
    return unsigned ? new Uint8Array(buffer) : new Int8Array(buffer);
  }
  if (bytes === 2) {
    return unsigned ? new Uint16Array(buffer) : new Int16Array(buffer);
  }
  return unsigned ? new Uint32Array(buffer) : new Int32Array(buffer);
}
