/**
 * @packageDocumentation
 * @module Utility
 */
import { Temperatures } from '../types/temperature';
import { roundNumber } from './internal';

/**
 * @private
 * @param celsius
 * @param to
 * @param roundTo
 */
export const celsiusTo = (celsius: number, to: string, roundTo: number): number => {
  if (to === Temperatures.CELSIUS) {
    return roundNumber(celsius, roundTo);
  }
  return roundNumber(to === Temperatures.FAHRENHEIT ? celsius * 1.8 + 32 : celsius + 273.15, roundTo);
};

/**
 * @private
 * @param fahrenheit
 * @param to
 * @param roundTo
 */
export const fahrenheitTo = (fahrenheit: number, to: string, roundTo: number): number => {
  if (to === Temperatures.FAHRENHEIT) {
    return roundNumber(fahrenheit, roundTo);
  }
  return roundNumber(to === Temperatures.CELSIUS ? (fahrenheit - 32) / 1.8 : (fahrenheit - 32) / 1.8 + 273.15, roundTo);
};

/**
 * @private
 * @param kelvin
 * @param to
 * @param roundTo
 */
export const kelvinTo = (kelvin: number, to: string, roundTo: number): number => {
  if (to === Temperatures.KELVIN) {
    return roundNumber(kelvin, roundTo);
  }
  return roundNumber(to === Temperatures.FAHRENHEIT ? (kelvin - 273.15) * 1.8 + 32 : kelvin - 273.15, roundTo);
};
