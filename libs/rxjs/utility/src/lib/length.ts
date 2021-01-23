/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { createOrReturnObservable } from '../utils/internal';
import { map, withLatestFrom } from 'rxjs/operators';
import { SupportedLengths } from '../types/length';
import { fromCm, fromFeet, fromInches, fromKm, fromMeters, fromMiles, fromYards } from '../utils/length';

/**
 * Returns an Observable that converts the source value through [[Lengths]] conversion
 *
 * @category Conversion
 *
 * @param fromLength The length type of the source value
 * @param toLength The length type of the output value
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
export function length<I extends SupportedLengths, O extends SupportedLengths>(
  fromLength: Subscribable<I> | I,
  toLength: Subscribable<O> | O,
  precision: Subscribable<number> | number = 3,
): MonoTypeOperatorFunction<number> {
  const fromLength$ = createOrReturnObservable(fromLength);
  const toLength$ = createOrReturnObservable(toLength);
  const precision$ = createOrReturnObservable(precision);

  return (source) =>
    source.pipe(
      withLatestFrom(fromLength$, toLength$, precision$),
      map<[number, string, string, number], number>(([value, fromLengthValue, toLengthValue, precisionValue]) => {
        switch (fromLengthValue) {
          case SupportedLengths.CENTIMETERS: {
            return fromCm[toLengthValue](value, precisionValue);
          }
          case SupportedLengths.FEET: {
            return fromFeet[toLengthValue](value, precisionValue);
          }
          case SupportedLengths.INCHES: {
            return fromInches[toLengthValue](value, precisionValue);
          }
          case SupportedLengths.KILOMETERS: {
            return fromKm[toLengthValue](value, precisionValue);
          }
          case SupportedLengths.METERS: {
            return fromMeters[toLengthValue](value, precisionValue);
          }
          case SupportedLengths.MILES: {
            return fromMiles[toLengthValue](value, precisionValue);
          }
          case SupportedLengths.YARDS: {
            return fromYards[toLengthValue](value, precisionValue);
          }
          /* istanbul ignore next-line */
          default:
            return value;
        }
      }),
    );
}
