/**
 * @packageDocumentation
 * @module String
 */

/**
 * Internal value type for the padding position
 * @internal
 */
export type PadPositionValue = 'start' | 'end';

/**
 * The position to do the string padding at
 */
export enum PadPosition {
  /**
   * Pad the start of the string
   */
  START = 'start',
  /**
   * Pad the end of the string from the last string character
   */
  END = 'end',
}

/**
 * Internal value type for the trim position
 * @internal
 */
export type TrimPositionValue = 'start' | 'end' | 'all';

/**
 * The available positions to trim a string at
 */
export enum TrimPosition {
  /**
   * Trim white space before the first non-whitespace character
   */
  START = 'start',
  /**
   * Trim white space after the last non-whitespace character
   */
  END = 'end',
  /**
   * Trim white space before the first non-whitespace character
   */
  ALL = 'all',
}
