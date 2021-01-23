/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { createOrReturnObservable } from '../utils/internal';
import { map, withLatestFrom } from 'rxjs/operators';
import { SupportedTemperatures } from '../types/temperature';
import { fromCelsius, fromFahrenheit, fromKelvin, fromRankine } from '../utils/temperature';

/**
 * Returns an Observable that emits a number based on the version of the source value through [[Temperatures]]
 * conversion
 *
 * @remarks This library does not handle validation on temperature values (e.g. negative Kelvin values)
 *
 * @category Conversion
 *
 * @typeParam I String or [[Temperatures]] value for the input value
 * @typeParam O String or [[Temperatures]] value for the output value
 *
 * @param fromTemperature The temperature type to convert from
 * @param toTemperature The temperature type to convert from
 * @param precision The number of decimal places to return, default is `1`
 *
 * @example
 * Convert a source of numbers from Celsius to Fahrenheit
 * ```ts
 * const source$ = from([0, 100, 37.5, -42]);
 *
 * source$.pipe(temperature(Temperatures.CELSIUS, Temperatures.FAHRENHEIT)).subscribe()
 * ```
 * Output: `32, 212, 99.5, -43.6`
 *
 * @example
 * Convert a source of numbers from Kelvin to Celsius with precision `2`
 * ```ts
 * const source$ = from([0, 100, 37.5, -42]);
 *
 * source$.pipe(temperature('kelvin', 'celsius', 2)).subscribe()
 * ```
 * Output: `32, 212, 99.5, -43.6`
 *
 * @returns Observable that emits a number that is the `from` [[Temperatures]] converted to the `to` [[Temperatures]]
 */
export function temperature<I extends SupportedTemperatures, O extends SupportedTemperatures>(
  fromTemperature: Subscribable<I> | I,
  toTemperature: Subscribable<O> | O,
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
          switch (fromTemperatureValue) {
            case SupportedTemperatures.CELSIUS: {
              return fromCelsius[toTemperatureValue](value, precisionValue);
            }
            case SupportedTemperatures.FAHRENHEIT: {
              return fromFahrenheit[toTemperatureValue](value, precisionValue);
            }
            case SupportedTemperatures.KELVIN: {
              return fromKelvin[toTemperatureValue](value, precisionValue);
            }
            case SupportedTemperatures.RANKINE: {
              return fromRankine[toTemperatureValue](value, precisionValue);
            }
            /* istanbul ignore next-line */
            default:
              return value;
          }
        },
      ),
    );
}
