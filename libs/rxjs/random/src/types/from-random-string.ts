/**
 * @packageDocumentation
 * @module Random
 */

/**
 * Options for the `fromRandomStr` function
 */
export interface FromRandomStringOpts {
  /**
   * Include upper case letters (default: `true`)
   */
  caps: boolean;
  /**
   * Include lower case letters (default: `true`)
   */
  lower: boolean;
  /**
   * Include numbers (default: `false`)
   */
  number: boolean;
  /**
   * Include special characters (default: `false`)
   */
  special: boolean;
}
