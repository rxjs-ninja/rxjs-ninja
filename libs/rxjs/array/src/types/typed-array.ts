/**
 * @packageDocumentation
 * @module Array
 */

/**
 * Constructor for a TypedArray or DataView backed by an ArrayBuffer.
 */
export type TypedArrayConstructor<T extends ArrayBufferView> = new (
  buffer: ArrayBuffer,
  byteOffset?: number,
  length?: number,
) => T;
