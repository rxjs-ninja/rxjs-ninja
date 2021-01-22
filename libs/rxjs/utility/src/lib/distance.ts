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
 * Returns an Observable that converts the source value through [[Distances]] conversion
 *
 * @category Conversion
 *
 * @param fromDistance The distance type of the source value
 * @param toDistance The distance type of the output value
 * @param precision The number of decimal places to return, default is `3`
 *
 * @example
 * Return the number of miles from meters to precision `0`
 * ```ts
 * const source$ = from([100, 200, 300, 500]);
 *
 * source$.pipe(distance(Distances.MILES, Distances.METERS, 0)).subscribe()
 * ```
 * Output: `160934, 321869, 482803, 804672`
 *
 * @returns Observable that emits a number that is the `from` [[Distances]] converted to the `to` [[Distances]]
 */
export function distance<T extends Distances>(
  fromDistance: Subscribable<T> | T,
  toDistance: Subscribable<T> | T,
  precision: Subscribable<number> | number = 3,
): MonoTypeOperatorFunction<number> {
  const fromDistance$ = createOrReturnObservable(fromDistance);
  const toDistance$ = createOrReturnObservable(toDistance);
  const precision$ = createOrReturnObservable(precision);

  return (source) =>
    source.pipe(
      withLatestFrom(fromDistance$, toDistance$, precision$),
      map<[number, string, string, number], number>(([value, fromDistanceValue, toDistanceValue, precisionValue]) => {
        switch (fromDistanceValue) {
          case Distances.CM: {
            return fromCm[toDistanceValue](value, precisionValue);
          }
          case Distances.FEET: {
            return fromFeet[toDistanceValue](value, precisionValue);
          }
          case Distances.INCHES: {
            return fromInches[toDistanceValue](value, precisionValue);
          }
          case Distances.KM: {
            return fromKm[toDistanceValue](value, precisionValue);
          }
          case Distances.METERS: {
            return fromMeters[toDistanceValue](value, precisionValue);
          }
          case Distances.MILES: {
            return fromMiles[toDistanceValue](value, precisionValue);
          }
          case Distances.YARDS: {
            return fromYards[toDistanceValue](value, precisionValue);
          }
          /* istanbul ignore next-line */
          default:
            return value;
        }
      }),
    );
}
