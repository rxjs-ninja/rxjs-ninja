/**
 * @packageDocumentation
 * @module Utility
 */
import { SupportedTemperatures } from '../types/temperature';
import { roundNumber } from './internal';
import { ConversionMapping } from '../types/internal';

/**
 * @private
 * @internal
 */
export const fromCelsius: ConversionMapping = {
  [SupportedTemperatures.CELSIUS]: (num, precision) => roundNumber(num, precision),
  [SupportedTemperatures.FAHRENHEIT]: (num, precision) => roundNumber(num * 1.8 + 32, precision),
  [SupportedTemperatures.KELVIN]: (num, precision) => roundNumber(num + 273.15, precision),
  [SupportedTemperatures.RANKINE]: (num, precision) => roundNumber((num + 273.15) * 1.8, precision),
};

/**
 * @private
 * @internal
 */
export const fromFahrenheit: ConversionMapping = {
  [SupportedTemperatures.CELSIUS]: (num, precision) => roundNumber((num - 32) / 1.8, precision),
  [SupportedTemperatures.FAHRENHEIT]: (num, precision) => roundNumber(num, precision),
  [SupportedTemperatures.KELVIN]: (num, precision) => roundNumber((num - 32) / 1.8 + 273.15, precision),
  [SupportedTemperatures.RANKINE]: (num, precision) => roundNumber(num + 459.67, precision),
};

/**
 * @private
 * @internal
 */
export const fromKelvin: ConversionMapping = {
  [SupportedTemperatures.CELSIUS]: (num, precision) => roundNumber(num - 273.15, precision),
  [SupportedTemperatures.FAHRENHEIT]: (num, precision) => roundNumber((num - 273.15) * 1.8 + 32, precision),
  [SupportedTemperatures.KELVIN]: (num, precision) => roundNumber(num, precision),
  [SupportedTemperatures.RANKINE]: (num, precision) => roundNumber(num * 1.8, precision),
};

/**
 * @private
 * @internal
 */
export const fromRankine: ConversionMapping = {
  [SupportedTemperatures.CELSIUS]: (num, precision) => roundNumber((num - 491.67) * 1.8, precision),
  [SupportedTemperatures.FAHRENHEIT]: (num, precision) => roundNumber(num - 491.67, precision),
  [SupportedTemperatures.KELVIN]: (num, precision) => roundNumber(num / 1.8, precision),
  [SupportedTemperatures.RANKINE]: (num, precision) => roundNumber(num, precision),
};
