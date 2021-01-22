/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { createOrReturnObservable } from '../utils/internal';
import { map, withLatestFrom } from 'rxjs/operators';
import { Temperatures } from '../types/temperature';
import { celsiusTo, fahrenheitTo, kelvinTo } from '../utils/temperature';

/**
 * Returns an Observable that converts the source value through [[Temperatures]] conversion
 *
 * @category Conversion
 *
 * @param fromTemperature The temperature type of the source value
 * @param toTemperature The temperature type of the output value
 * @param precision The number of decimal places to return, default is `1`
 *
 * @example
 * Return Fahrenheit from Celsius temperatures
 * ```ts
 * const source$ = from([0, 100, 37.5, -42]);
 *
 * source.pipe(temperature(Temperatures.CELSIUS, Temperatures.FAHRENHEIT)).subscribe()
 * ```
 * Output: `32, 212, 99.5, -43.6`
 *
 * @returns Observable that emits a number that is the `from` [[Temperatures]] converted to the `to` [[Temperatures]]
 */
export function temperature<T extends Temperatures>(
  fromTemperature: Subscribable<T> | T,
  toTemperature: Subscribable<T> | T,
  precision: Subscribable<number> | number = 1,
): MonoTypeOperatorFunction<number> {
  const fromTemperature$ = createOrReturnObservable(fromTemperature);
  const toTemperature$ = createOrReturnObservable(toTemperature);
  const precision$ = createOrReturnObservable(precision);

  return (source) =>
    source.pipe(
      withLatestFrom(fromTemperature$, toTemperature$, precision$),
      map<[number, string, string, number], number>(
        ([value, fromTemperatureValue, toTemperatureValue, precisionValue]) => {
          if (fromTemperatureValue === Temperatures.CELSIUS) {
            return celsiusTo(value, toTemperatureValue, precisionValue);
          } else if (fromTemperatureValue === Temperatures.FAHRENHEIT) {
            return fahrenheitTo(value, toTemperatureValue, precisionValue);
          } else if (fromTemperatureValue === Temperatures.KELVIN) {
            return kelvinTo(value, toTemperatureValue, precisionValue);
          }
          return value;
        },
      ),
    );
}
