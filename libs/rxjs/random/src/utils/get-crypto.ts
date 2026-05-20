/**
 * @packageDocumentation
 * @module Random
 */

/**
 * Returns the environment `Crypto` implementation (`globalThis.crypto`).
 *
 * @throws If `getRandomValues` is unavailable
 */
export function getCrypto(): Crypto {
  const crypto = globalThis.crypto;
  if (!crypto?.getRandomValues) {
    throw new Error('Web Crypto API (crypto.getRandomValues) is not available in this environment');
  }
  return crypto;
}
