/**
 * @packageDocumentation
 * @module Utility
 */
import { roundNumber } from '../utils/internal';

/**
 * @private
 */
export const fromKg: Record<string, (num: number, precision: number) => number> = {
  lb: (value: number, precision: number) => roundNumber(value * 2.2046, precision),
  oz: (value: number, precision: number) => roundNumber(value * 35.274, precision),
  g: (value: number, precision: number) => roundNumber(value * 1000, precision),
  st: (value: number, precision: number) => roundNumber(value * 0.1574, precision),
};

/**
 * @private
 */
export const fromLb: Record<string, (num: number, precision: number) => number> = {
  kg: (value: number, precision: number) => roundNumber(value / 2.2046, precision),
  oz: (value: number, precision: number) => roundNumber(value * 16, precision),
  g: (value: number, precision: number) => roundNumber(value / 0.0022046, precision),
  st: (value: number, precision: number) => roundNumber(value * 0.071429, precision),
};

/**
 * @private
 */
export const fromG: Record<string, (num: number, precision: number) => number> = {
  kg: (value: number, precision: number) => roundNumber(value / 1000, precision),
  oz: (value: number, precision: number) => roundNumber(value * 0.035274, precision),
  lb: (value: number, precision: number) => roundNumber(value * 0.0022046, precision),
  st: (value: number, precision: number) => roundNumber(value * 0.00015747, precision),
};

/**
 * @private
 */
export const fromOz: Record<string, (num: number, precision: number) => number> = {
  lb: (value: number, precision: number) => roundNumber(value * 0.0625, precision),
  kg: (value: number, precision: number) => roundNumber(value / 35.274, precision),
  g: (value: number, precision: number) => roundNumber(value / 0.035274, precision),
  st: (value: number, precision: number) => roundNumber(value * 0.0044643, precision),
};

/**
 * @private
 */
export const fromSt: Record<string, (num: number, precision: number) => number> = {
  kg: (value: number, precision: number) => roundNumber(value / 0.15747, precision),
  oz: (value: number, precision: number) => roundNumber(value * 224, precision),
  lb: (value: number, precision: number) => roundNumber(value * 14, precision),
  g: (value: number, precision: number) => roundNumber(value / 0.00015747, precision),
};
