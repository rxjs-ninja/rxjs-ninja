/**
 * @packageDocumentation
 * @module Utility
 */
import { roundNumber } from '../utils/internal';
import { ConversionMapping } from '../types/internal';
import { SupportedWeights } from '../types/weight';

/**
 * @private
 */
export const fromKg: ConversionMapping = {
  [SupportedWeights.GRAMS]: (value: number, precision: number) => roundNumber(value * 1000, precision),
  [SupportedWeights.KILOGRAMS]: (value: number, precision: number) => roundNumber(value, precision),
  [SupportedWeights.POUNDS]: (value: number, precision: number) => roundNumber(value * 2.2046, precision),
  [SupportedWeights.OUNCES]: (value: number, precision: number) => roundNumber(value * 35.274, precision),
  [SupportedWeights.STONE]: (value: number, precision: number) => roundNumber(value * 0.1574, precision),
};

/**
 * @private
 */
export const fromLb: ConversionMapping = {
  [SupportedWeights.GRAMS]: (value: number, precision: number) => roundNumber(value / 0.0022046, precision),
  [SupportedWeights.KILOGRAMS]: (value: number, precision: number) => roundNumber(value / 2.2046, precision),
  [SupportedWeights.POUNDS]: (value: number, precision: number) => roundNumber(value, precision),
  [SupportedWeights.OUNCES]: (value: number, precision: number) => roundNumber(value * 16, precision),
  [SupportedWeights.STONE]: (value: number, precision: number) => roundNumber(value * 0.071429, precision),
};

/**
 * @private
 */
export const fromG: ConversionMapping = {
  [SupportedWeights.GRAMS]: (value: number, precision: number) => roundNumber(value, precision),
  [SupportedWeights.KILOGRAMS]: (value: number, precision: number) => roundNumber(value / 1000, precision),
  [SupportedWeights.POUNDS]: (value: number, precision: number) => roundNumber(value * 0.0022046, precision),
  [SupportedWeights.OUNCES]: (value: number, precision: number) => roundNumber(value * 0.035274, precision),
  [SupportedWeights.STONE]: (value: number, precision: number) => roundNumber(value * 0.00015747, precision),
};

/**
 * @private
 */
export const fromOz: ConversionMapping = {
  [SupportedWeights.GRAMS]: (value: number, precision: number) => roundNumber(value / 0.035274, precision),
  [SupportedWeights.KILOGRAMS]: (value: number, precision: number) => roundNumber(value / 35.274, precision),
  [SupportedWeights.POUNDS]: (value: number, precision: number) => roundNumber(value * 0.0625, precision),
  [SupportedWeights.OUNCES]: (value: number, precision: number) => roundNumber(value, precision),
  [SupportedWeights.STONE]: (value: number, precision: number) => roundNumber(value * 0.0044643, precision),
};

/**
 * @private
 */
export const fromSt: ConversionMapping = {
  [SupportedWeights.GRAMS]: (value: number, precision: number) => roundNumber(value / 0.00015747, precision),
  [SupportedWeights.KILOGRAMS]: (value: number, precision: number) => roundNumber(value / 0.15747, precision),
  [SupportedWeights.POUNDS]: (value: number, precision: number) => roundNumber(value * 14, precision),
  [SupportedWeights.OUNCES]: (value: number, precision: number) => roundNumber(value * 224, precision),
  [SupportedWeights.STONE]: (value: number, precision: number) => roundNumber(value, precision),
};
