/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { createOrReturnObservable, roundNumber } from '../utils/internal';
import { map, withLatestFrom } from 'rxjs/operators';
import { SupportedWeights } from '../types/weight';
import { fromG, fromKg, fromLb, fromOz, fromSt } from '../utils/weight';

/**
 * Returns an Observable that converts the source value through [[Weights]] conversion
 *
 * @category Conversion
 *
 * @typeParam I String or [[Weights]] value for the input value
 * @typeParam O String or [[Weights]] value for the output value
 *
 * @param fromWeight The weight type of the source value
 * @param toWeight The weight type of the output value
 * @param precision The number of decimal places to return, default is `2`
 *
 * @example
 * Convert Grams to Kilograms
 * ```ts
 * const source$ = from([10, 5, 100]);
 *
 * source$.pipe(weight(Weights.GRAMS, Weights.KILOGRAMS)).subscribe()
 * ```
 * Output: `0.01, 0.05, 0.1`
 *
 * @example
 * Convert Kilograms to Stone with a precision of `1`
 * ```ts
 * const source$ = from([10, 5, 100]);
 *
 * source$.pipe(weight('st', 'kg', 1)).subscribe()
 * ```
 * Output: `63.5, 31.8, 635`
 *
 * @returns Observable that emits a number that is the `from` [[Weights]] converted to the `to` [[Weights]]
 */
export function weight<I extends SupportedWeights, O extends SupportedWeights>(
  fromWeight: Subscribable<I> | I,
  toWeight: Subscribable<O> | O,
  precision: Subscribable<number> | number = 2,
): MonoTypeOperatorFunction<number> {
  const fromWeight$ = createOrReturnObservable(fromWeight);
  const toWeight$ = createOrReturnObservable(toWeight);
  const precision$ = createOrReturnObservable(precision);

  return (source) =>
    source.pipe(
      withLatestFrom(fromWeight$, toWeight$, precision$),
      map<[number, string, string, number], number>(([value, fromWeightValue, toWeightValue, precisionValue]) => {
        switch (fromWeightValue) {
          case SupportedWeights.GRAMS: {
            return fromG[toWeightValue](value, precisionValue);
          }
          case SupportedWeights.KILOGRAMS: {
            return fromKg[toWeightValue](value, precisionValue);
          }
          case SupportedWeights.POUNDS: {
            return fromLb[toWeightValue](value, precisionValue);
          }
          case SupportedWeights.OUNCES: {
            return fromOz[toWeightValue](value, precisionValue);
          }
          case SupportedWeights.STONE: {
            return fromSt[toWeightValue](value, precisionValue);
          }
          /* istanbul ignore next-line */
          default:
            return roundNumber(value, precisionValue);
        }
      }),
    );
}
