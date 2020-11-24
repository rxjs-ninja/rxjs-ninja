/**
 * @packageDocumentation
 * @module Random
 */

/**
 * @private
 * @internal
 * @param bytes
 * @param unsigned
 */
export function getIntTypedArray(bytes: number, unsigned?: boolean): ArrayBufferView {
  if (bytes === 1) {
    return unsigned ? new Uint8Array(1) : new Int8Array(1);
  } else if (bytes === 2) {
    return unsigned ? new Uint16Array(1) : new Int16Array(1);
  }
  return unsigned ? new Uint32Array(1) : new Int32Array(1);
}
