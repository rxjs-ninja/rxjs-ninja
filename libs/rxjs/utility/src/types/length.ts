/**
 * @packageDocumentation
 * @module Utility
 */

/**
 * @private
 * @internal
 */
export const SupportedLengths = {
  /**
   * Centimeters
   */
  CENTIMETERS: 'cm',
  /**
   * Feet
   */
  FEET: 'feet',
  /**
   * Inches
   */
  INCHES: 'inches',
  /**
   * Kilometers
   */
  KILOMETERS: 'km',
  /**
   * Meters
   */
  METERS: 'meters',
  /**
   * Miles
   */
  MILES: 'miles',
  /**
   * Yards
   */
  YARDS: 'yards',
} as const;

/**
 * @private
 * @internal
 */
export type SupportedLengths = typeof SupportedLengths[keyof typeof SupportedLengths];

/**
 * Supported length types in the [[length]] operator
 */
export enum Lengths {
  /**
   * Centimeters
   */
  CENTIMETERS = 'cm',
  /**
   * Feet
   */
  FEET = 'feet',
  /**
   * Inches
   */
  INCHES = 'inches',
  /**
   * Kilometers
   */
  KILOMETERS = 'km',
  /**
   * Meters
   */
  METERS = 'meters',
  /**
   * Miles
   */
  MILES = 'miles',
  /**
   * Yards
   */
  YARDS = 'yards',
}
