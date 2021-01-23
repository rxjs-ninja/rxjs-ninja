/**
 * @packageDocumentation
 * @module Utility
 */
import { roundNumber } from '../utils/internal';
import { ConversionMapping } from '../types/internal';

/**
 * @private
 */
export const fromKg: ConversionMapping = {
  g: (value: number, precision: number) => roundNumber(value * 1000, precision),
  kg: (value: number, precision: number) => roundNumber(value, precision),
  lb: (value: number, precision: number) => roundNumber(value * 2.2046, precision),
  oz: (value: number, precision: number) => roundNumber(value * 35.274, precision),
  st: (value: number, precision: number) => roundNumber(value * 0.1574, precision),
};

/**
 * @private
 */
export const fromLb: ConversionMapping = {
  g: (value: number, precision: number) => roundNumber(value / 0.0022046, precision),
  kg: (value: number, precision: number) => roundNumber(value / 2.2046, precision),
  lb: (value: number, precision: number) => roundNumber(value, precision),
  oz: (value: number, precision: number) => roundNumber(value * 16, precision),
  st: (value: number, precision: number) => roundNumber(value * 0.071429, precision),
};

/**
 * @private
 */
export const fromG: ConversionMapping = {
  g: (value: number, precision: number) => roundNumber(value, precision),
  kg: (value: number, precision: number) => roundNumber(value / 1000, precision),
  lb: (value: number, precision: number) => roundNumber(value * 0.0022046, precision),
  oz: (value: number, precision: number) => roundNumber(value * 0.035274, precision),
  st: (value: number, precision: number) => roundNumber(value * 0.00015747, precision),
};

/**
 * @private
 */
export const fromOz: ConversionMapping = {
  g: (value: number, precision: number) => roundNumber(value / 0.035274, precision),
  kg: (value: number, precision: number) => roundNumber(value / 35.274, precision),
  lb: (value: number, precision: number) => roundNumber(value * 0.0625, precision),
  oz: (value: number, precision: number) => roundNumber(value, precision),
  st: (value: number, precision: number) => roundNumber(value * 0.0044643, precision),
};

/**
 * @private
 */
export const fromSt: ConversionMapping = {
  g: (value: number, precision: number) => roundNumber(value / 0.00015747, precision),
  kg: (value: number, precision: number) => roundNumber(value / 0.15747, precision),
  lb: (value: number, precision: number) => roundNumber(value * 14, precision),
  oz: (value: number, precision: number) => roundNumber(value * 224, precision),
  st: (value: number, precision: number) => roundNumber(value, precision),
};
