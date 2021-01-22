/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { createOrReturnObservable } from '../utils/internal';
import { map, withLatestFrom } from 'rxjs/operators';
import { Distances } from '../types/distance';
import { fromCm, fromFeet, fromInches, fromKm, fromMeters, fromMiles, fromYards } from '../utils/distance';

/**
 * Returns an Observable that converts the source value through [[Temperature]] conversion
 *
 * @category Conversion
 *
 * @param from The temperature type of the source value
 * @param to The temperature type of the output value
 * @param precision The number of decimal places to return, default is `3`
 *
 * @example
 * Return Fahrenheit from Celsius temperatures
 * ```ts
 * const source$ = from([0, 100, 37.5, -42]);
 *
 * source.pipe(temperature(Temperature.CELSIUS, Temperature.FAHRENHEIT)).subscribe()
 * ```
 * Output: `32, 212, 99.5, -43.6`
 *
 * @returns Observable that emits a number that is the `from` [[Temperature]] converted to the `to` [[Temperature]]
 */
export function distance(
  from: Subscribable<string> | string,
  to: Subscribable<string> | string,
  precision: Subscribable<number> | number = 3,
): MonoTypeOperatorFunction<number> {
  const from$ = createOrReturnObservable(from);
  const to$ = createOrReturnObservable(to);
  const precision$ = createOrReturnObservable(precision);

  return (source) =>
    source.pipe(
      withLatestFrom(from$, to$, precision$),
      map<[number, string, string, number], number>(([value, fromValue, toValue, precisionValue]) => {
        switch (fromValue) {
          case Distances.CM: {
            return fromCm[toValue](value, precisionValue);
          }
          case Distances.FEET: {
            return fromFeet[toValue](value, precisionValue);
          }
          case Distances.INCHES: {
            return fromInches[toValue](value, precisionValue);
          }
          case Distances.KM: {
            return fromKm[toValue](value, precisionValue);
          }
          case Distances.METERS: {
            return fromMeters[toValue](value, precisionValue);
          }
          case Distances.MILES: {
            return fromMiles[toValue](value, precisionValue);
          }
          case Distances.YARDS: {
            return fromYards[toValue](value, precisionValue);
          }
          default:
            return value;
        }
      }),
    );
}
