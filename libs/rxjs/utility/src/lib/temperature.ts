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
 * @param from The temperature type of the source value
 * @param to The temperature type of the output value
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
export function temperature(
  from: Subscribable<string> | string,
  to: Subscribable<string> | string,
  precision: Subscribable<number> | number = 1,
): MonoTypeOperatorFunction<number> {
  const from$ = createOrReturnObservable(from);
  const to$ = createOrReturnObservable(to);
  const precision$ = createOrReturnObservable(precision);

  return (source) =>
    source.pipe(
      withLatestFrom(from$, to$, precision$),
      map<[number, string, string, number], number>(([value, fromValue, toValue, precisionValue]) => {
        if (fromValue === Temperatures.CELSIUS) {
          return celsiusTo(value, toValue, precisionValue);
        } else if (fromValue === Temperatures.FAHRENHEIT) {
          return fahrenheitTo(value, toValue, precisionValue);
        } else if (fromValue === Temperatures.KELVIN) {
          return kelvinTo(value, toValue, precisionValue);
        }
        return value;
      }),
    );
}
