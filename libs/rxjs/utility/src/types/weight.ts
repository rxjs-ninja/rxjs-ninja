/**
 * @packageDocumentation
 * @module Utility
 */

/**
 * @private
 * @internal
 */
export const SupportedWeights = {
  /**
   * Grams
   */
  GRAMS: 'g',
  /**
   * Kilograms
   */
  KILOGRAMS: 'kg',
  /**
   * Pounds
   */
  POUNDS: 'lb',
  /**
   * Ounces
   */
  OUNCES: 'oz',
  /**
   * Stones
   */
  STONE: 'st',
} as const;

/**
 * @private
 * @internal
 */
export type SupportedWeights = typeof SupportedWeights[keyof typeof SupportedWeights];

/**
 * Types of weights supported by the [[weight]] operator
 */
export enum Weights {
  /**
   * Grams
   */
  GRAMS = 'g',
  /**
   * Kilograms
   */
  KILOGRAMS = 'kg',
  /**
   * Pounds
   */
  POUNDS = 'lb',
  /**
   * Ounces
   */
  OUNCES = 'oz',
  /**
   * Stones
   */
  STONE = 'st',
}
