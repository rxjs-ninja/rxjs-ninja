/**
 * @packageDocumentation
 * @module Utility
 */

/**
 * @private
 * @internal
 */
export const SupportedTemperatures = {
  /**
   * Celsius
   */
  CELSIUS: 'celsius',
  /**
   * Fahrenheit
   */
  FAHRENHEIT: 'fahrenheit',
  /**
   * Kelvin
   */
  KELVIN: 'kelvin',
  /**
   * Rankine
   */
  RANKINE: 'rankine',
} as const;

/**
 * @private
 * @internal
 */
export type SupportedTemperatures = typeof SupportedTemperatures[keyof typeof SupportedTemperatures];

/**
 * Available supported values for conversion with the [[temperature]] operator
 */
export enum Temperatures {
  /**
   * Celsius
   */
  CELSIUS = 'celsius',
  /**
   * Fahrenheit
   */
  FAHRENHEIT = 'fahrenheit',
  /**
   * Kelvin
   */
  KELVIN = 'kelvin',
  /**
   * Rankine
   */
  RANKINE = 'rankine',
}
