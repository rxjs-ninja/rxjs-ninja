/**
 * @packageDocumentation
 * @module Utility
 */
import { roundNumber } from './internal';

/**
 * Contains conversion functions for values from centimeters
 * @private
 */
export const fromCm: Record<string, (num: number, precision: number) => number> = {
  feet: (value: number, precision: number) => roundNumber(value * 0.032808, precision),
  meters: (value: number, precision: number) => roundNumber(value / 100, precision),
  inches: (value: number, precision: number) => roundNumber(value * 0.3937, precision),
  yards: (value: number, precision: number) => roundNumber(value * 0.010936, precision),
  km: (value: number, precision: number) => roundNumber(value / 100000, precision),
  miles: (value: number, precision: number) => roundNumber(value * 0.0000062137, precision),
};

/**
 * Contains conversion functions for values from feet
 * @private
 */
export const fromFeet: Record<string, (num: number, precision: number) => number> = {
  meters: (value: number, precision: number) => roundNumber(value / 3.2808, precision),
  inches: (value: number, precision: number) => roundNumber(value * 12, precision),
  cm: (value: number, precision: number) => roundNumber(value / 0.032808, precision),
  yards: (value: number, precision: number) => roundNumber(value * 0.33333, precision),
  km: (value: number, precision: number) => roundNumber(value / 3280.8, precision),
  miles: (value: number, precision: number) => roundNumber(value * 0.00018939, precision),
};

/**
 * Contains conversion functions for values from meters
 * @private
 */
export const fromInches: Record<string, (num: number, precision: number) => number> = {
  feet: (value: number, precision: number) => roundNumber(value * 0.083333, precision),
  meters: (value: number, precision: number) => roundNumber(value / 39.37, precision),
  cm: (value: number, precision: number) => roundNumber(value / 0.3937, precision),
  yards: (value: number, precision: number) => roundNumber(value * 0.027778, precision),
  km: (value: number, precision: number) => roundNumber(value / 39370, precision),
  miles: (value: number, precision: number) => roundNumber(value * 0.000015783, precision),
};

/**
 * Contains conversion functions for values from centimeters
 * @private
 */
export const fromKm: Record<string, (num: number, precision: number) => number> = {
  feet: (value: number, precision: number) => roundNumber(value * 3280.8, precision),
  meters: (value: number, precision: number) => roundNumber(value * 1000, precision),
  inches: (value: number, precision: number) => roundNumber(value * 39370, precision),
  cm: (value: number, precision: number) => roundNumber(value * 100000, precision),
  yards: (value: number, precision: number) => roundNumber(value * 1093.6, precision),
  miles: (value: number, precision: number) => roundNumber(value * 0.62137, precision),
};

/**
 * Contains conversion functions for values from meters
 * @private
 */
export const fromMeters: Record<string, (num: number, precision: number) => number> = {
  feet: (value: number, precision: number) => roundNumber(value * 3.2808, precision),
  inches: (value: number, precision: number) => roundNumber(value * 39.37, precision),
  cm: (value: number, precision: number) => roundNumber(value / 0.01, precision),
  yards: (value: number, precision: number) => roundNumber(value * 1.0936, precision),
  km: (value: number, precision: number) => roundNumber(value / 1000, precision),
  miles: (value: number, precision: number) => roundNumber(value * 0.00062137, precision),
};

/**
 * Contains conversion functions for values from centimeters
 * @private
 */
export const fromMiles: Record<string, (num: number, precision: number) => number> = {
  feet: (value: number, precision: number) => roundNumber(value * 5280, precision),
  meters: (value: number, precision: number) => roundNumber(value / 0.00062137, precision),
  inches: (value: number, precision: number) => roundNumber(value * 63360, precision),
  cm: (value: number, precision: number) => roundNumber(value / 0.0000062137, precision),
  yards: (value: number, precision: number) => roundNumber(value * 1760, precision),
  km: (value: number, precision: number) => roundNumber(value / 0.62137, precision),
};

/**
 * Contains conversion functions for values from centimeters
 * @private
 */
export const fromYards: Record<string, (num: number, precision: number) => number> = {
  feet: (value: number, precision: number) => roundNumber(value * 3, precision),
  meters: (value: number, precision: number) => roundNumber(value / 1.0936, precision),
  inches: (value: number, precision: number) => roundNumber(value * 36, precision),
  cm: (value: number, precision: number) => roundNumber(value / 0.010936, precision),
  km: (value: number, precision: number) => roundNumber(value / 1093.6, precision),
  miles: (value: number, precision: number) => roundNumber(value * 0.00056818, precision),
};
