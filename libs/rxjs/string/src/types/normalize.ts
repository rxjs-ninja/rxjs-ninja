/**
 * @packageDocumentation
 * @module string
 */

/**
 * The type of form to normalize a unicode string with, default is 'NFC'
 */
export enum FormType {
  /**
   * Canonical Decomposition, followed by Canonical Composition.
   */
  NFC = 'NFC',
  /**
   * Canonical Decomposition.
   */
  NFD = 'NFD',
  /**
   * Compatibility Decomposition, followed by Canonical Composition.
   */
  NFKC = 'NFKC',
  /**
   * Compatibility Decomposition.
   */
  NFKD = 'NFKD',
}
