/**
 * @packageDocumentation
 * @module Utility
 */
import { roundNumber } from './internal';
import { ConversionMapping } from '../types/internal';
import { SupportedLengths } from '../types/length';

/**
 * Contains conversion functions for values from centimeters
 * @private
 */
export const fromCm: ConversionMapping = {
  [SupportedLengths.CENTIMETERS]: (num, precision) => roundNumber(num, precision),
  [SupportedLengths.FEET]: (value: number, precision: number) => roundNumber(value * 0.032808, precision),
  [SupportedLengths.INCHES]: (value: number, precision: number) => roundNumber(value * 0.3937, precision),
  [SupportedLengths.KILOMETERS]: (value: number, precision: number) => roundNumber(value / 100000, precision),
  [SupportedLengths.METERS]: (value: number, precision: number) => roundNumber(value / 100, precision),
  [SupportedLengths.MILES]: (value: number, precision: number) => roundNumber(value * 0.0000062137, precision),
  yards: (value: number, precision: number) => roundNumber(value * 0.010936, precision),
};

/**
 * Contains conversion functions for values from feet
 * @private
 */
export const fromFeet: ConversionMapping = {
  [SupportedLengths.CENTIMETERS]: (value: number, precision: number) => roundNumber(value / 0.032808, precision),
  [SupportedLengths.FEET]: (value: number, precision: number) => roundNumber(value, precision),
  [SupportedLengths.INCHES]: (value: number, precision: number) => roundNumber(value * 12, precision),
  [SupportedLengths.KILOMETERS]: (value: number, precision: number) => roundNumber(value / 3280.8, precision),
  [SupportedLengths.METERS]: (value: number, precision: number) => roundNumber(value / 3.2808, precision),
  [SupportedLengths.MILES]: (value: number, precision: number) => roundNumber(value * 0.00018939, precision),
  [SupportedLengths.YARDS]: (value: number, precision: number) => roundNumber(value * 0.33333, precision),
};

/**
 * Contains conversion functions for values from meters
 * @private
 */
export const fromInches: ConversionMapping = {
  [SupportedLengths.CENTIMETERS]: (value: number, precision: number) => roundNumber(value / 0.3937, precision),
  [SupportedLengths.FEET]: (value: number, precision: number) => roundNumber(value * 0.083333, precision),
  [SupportedLengths.INCHES]: (value: number, precision: number) => roundNumber(value, precision),
  [SupportedLengths.KILOMETERS]: (value: number, precision: number) => roundNumber(value / 39370, precision),
  [SupportedLengths.METERS]: (value: number, precision: number) => roundNumber(value / 39.37, precision),
  [SupportedLengths.MILES]: (value: number, precision: number) => roundNumber(value * 0.000015783, precision),
  [SupportedLengths.YARDS]: (value: number, precision: number) => roundNumber(value * 0.027778, precision),
};

/**
 * Contains conversion functions for values from centimeters
 * @private
 */
export const fromKm: ConversionMapping = {
  [SupportedLengths.CENTIMETERS]: (value: number, precision: number) => roundNumber(value * 100000, precision),
  [SupportedLengths.FEET]: (value: number, precision: number) => roundNumber(value * 3280.8, precision),
  [SupportedLengths.INCHES]: (value: number, precision: number) => roundNumber(value * 39370, precision),
  [SupportedLengths.KILOMETERS]: (value: number, precision: number) => roundNumber(value, precision),
  [SupportedLengths.METERS]: (value: number, precision: number) => roundNumber(value * 1000, precision),
  [SupportedLengths.MILES]: (value: number, precision: number) => roundNumber(value * 0.62137, precision),
  [SupportedLengths.YARDS]: (value: number, precision: number) => roundNumber(value * 1093.6, precision),
};

/**
 * Contains conversion functions for values from meters
 * @private
 */
export const fromMeters: ConversionMapping = {
  [SupportedLengths.CENTIMETERS]: (value: number, precision: number) => roundNumber(value / 0.01, precision),
  [SupportedLengths.FEET]: (value: number, precision: number) => roundNumber(value * 3.2808, precision),
  [SupportedLengths.INCHES]: (value: number, precision: number) => roundNumber(value * 39.37, precision),
  [SupportedLengths.KILOMETERS]: (value: number, precision: number) => roundNumber(value / 1000, precision),
  [SupportedLengths.METERS]: (value: number, precision: number) => roundNumber(value, precision),
  [SupportedLengths.MILES]: (value: number, precision: number) => roundNumber(value * 0.00062137, precision),
  [SupportedLengths.YARDS]: (value: number, precision: number) => roundNumber(value * 1.0936, precision),
};

/**
 * Contains conversion functions for values from centimeters
 * @private
 */
export const fromMiles: ConversionMapping = {
  [SupportedLengths.CENTIMETERS]: (value: number, precision: number) => roundNumber(value / 0.0000062137, precision),
  [SupportedLengths.FEET]: (value: number, precision: number) => roundNumber(value * 5280, precision),
  [SupportedLengths.INCHES]: (value: number, precision: number) => roundNumber(value * 63360, precision),
  [SupportedLengths.KILOMETERS]: (value: number, precision: number) => roundNumber(value / 0.62137, precision),
  [SupportedLengths.METERS]: (value: number, precision: number) => roundNumber(value / 0.00062137, precision),
  [SupportedLengths.MILES]: (value: number, precision: number) => roundNumber(value, precision),
  [SupportedLengths.YARDS]: (value: number, precision: number) => roundNumber(value * 1760, precision),
};

/**
 * Contains conversion functions for values from centimeters
 * @private
 */
export const fromYards: ConversionMapping = {
  [SupportedLengths.CENTIMETERS]: (value: number, precision: number) => roundNumber(value / 0.010936, precision),
  [SupportedLengths.FEET]: (value: number, precision: number) => roundNumber(value * 3, precision),
  [SupportedLengths.INCHES]: (value: number, precision: number) => roundNumber(value * 36, precision),
  [SupportedLengths.KILOMETERS]: (value: number, precision: number) => roundNumber(value / 1093.6, precision),
  [SupportedLengths.METERS]: (value: number, precision: number) => roundNumber(value / 1.0936, precision),
  [SupportedLengths.MILES]: (value: number, precision: number) => roundNumber(value * 0.00056818, precision),
  [SupportedLengths.YARDS]: (value: number, precision: number) => roundNumber(value, precision),
};
