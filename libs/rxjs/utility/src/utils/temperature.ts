/**
 * @packageDocumentation
 * @module Utility
 */
import { Temperature } from '../types/temperature';

function round(num: number, places: number): number {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
}

export const celsiusTo = (celsius: number, to: string, roundTo: number): number => {
  if (to === Temperature.CELSIUS) {
    return round(celsius, roundTo);
  }
  return round(to === Temperature.FAHRENHEIT ? celsius * 1.8 + 32 : celsius + 273.15, roundTo);
};

export const fahrenheitTo = (fahrenheit: number, to: string, roundTo: number): number => {
  if (to === Temperature.FAHRENHEIT) {
    return round(fahrenheit, roundTo);
  }
  return round(to === Temperature.CELSIUS ? (fahrenheit - 32) / 1.8 : (fahrenheit - 32) / 1.8 + 273.15, roundTo);
};

export const kelvinTo = (kelvin: number, to: string, roundTo: number): number => {
  if (to === Temperature.KELVIN) {
    return round(kelvin, roundTo);
  }
  return round(to === Temperature.FAHRENHEIT ? (kelvin - 273.15) * 1.8 + 32 : kelvin - 273.15, roundTo);
};
