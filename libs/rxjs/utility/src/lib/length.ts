/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { createOrReturnObservable } from '../utils/internal';
import { map, withLatestFrom } from 'rxjs/operators';
import { Lengths } from '../types/length';
import { fromCm, fromFeet, fromInches, fromKm, fromMeters, fromMiles, fromYards } from '../utils/distance';

/**
 * Returns an Observable that converts the source value through [[Lengths]] conversion
 *
 * @category Conversion
 *
 * @param fromDistance The length type of the source value
 * @param toDistance The length type of the output value
 * @param precision The number of decimal places to return, default is `3`
 *
 * @example
 * Return the number of miles from meters to precision `0`
 * ```ts
 * const source$ = from([100, 200, 300, 500]);
 *
 * source$.pipe(length(Lengths.MILES, Lengths.METERS, 0)).subscribe()
 * ```
 * Output: `160934, 321869, 482803, 804672`
 *
 * @returns Observable that emits a number that is the `from` [[Lengths]] converted to the `to` [[Lengths]]
 */
export function length<T extends Lengths>(
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
          case Lengths.CM: {
            return fromCm[toDistanceValue](value, precisionValue);
          }
          case Lengths.FEET: {
            return fromFeet[toDistanceValue](value, precisionValue);
          }
          case Lengths.INCHES: {
            return fromInches[toDistanceValue](value, precisionValue);
          }
          case Lengths.KM: {
            return fromKm[toDistanceValue](value, precisionValue);
          }
          case Lengths.METERS: {
            return fromMeters[toDistanceValue](value, precisionValue);
          }
          case Lengths.MILES: {
            return fromMiles[toDistanceValue](value, precisionValue);
          }
          case Lengths.YARDS: {
            return fromYards[toDistanceValue](value, precisionValue);
          }
          /* istanbul ignore next-line */
          default:
            return value;
        }
      }),
    );
}
