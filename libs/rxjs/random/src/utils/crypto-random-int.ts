import { getCrypto } from './get-crypto';

/**
 * Returns an unbiased random integer in the inclusive range `[min, max]` using `crypto.getRandomValues`.
 *
 * @private
 * @internal
 */
export function cryptoRandomInt(min: number, max: number): number {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  if (maxValue < minValue) {
    throw new RangeError('max must be greater than or equal to min');
  }
  const range = maxValue - minValue + 1;
  if (range === 1) {
    return minValue;
  }

  const crypto = getCrypto();
  const maxUint32 = 0x1_0000_0000;
  const limit = maxUint32 - (maxUint32 % range);
  const buffer = new Uint32Array(1);

  let sample = 0;
  do {
    crypto.getRandomValues(buffer);
    sample = buffer[0] ?? 0;
  } while (sample >= limit);

  return (sample % range) + minValue;
}

/**
 * Returns an unbiased index in `[0, length - 1]` for picking from a charset or typed array.
 *
 * @private
 * @internal
 */
export function cryptoRandomIndex(length: number): number {
  if (length <= 0) {
    throw new RangeError('length must be greater than 0');
  }
  return cryptoRandomInt(0, length - 1);
}
