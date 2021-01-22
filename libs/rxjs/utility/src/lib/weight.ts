/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { createOrReturnObservable } from '../utils/internal';
import { map, withLatestFrom } from 'rxjs/operators';
import { Weights } from '../types/weight';
import { fromG, fromKg, fromLb, fromOz, fromSt } from '../utils/weight';

/**
 * Returns an Observable that converts the source value through [[Weights]] conversion
 *
 * @category Conversion
 *
 * @param fromWeight The weight type of the source value
 * @param toWeight The weight type of the output value
 * @param precision The number of decimal places to return, default is `2`
 *
 * @example
 * Return the `Kg` value of the source `St` value to precision `1`
 * ```ts
 * const source$ = from([10, 5, 100]);
 *
 * source$.pipe(weight(Weights.ST, Weights.KG)).subscribe()
 * ```
 * Output: `63.5, 31.8, 635`
 *
 * @returns Observable that emits a number that is the `from` [[Weights]] converted to the `to` [[Weights]]
 */
export function weight<T extends Weights>(
  fromWeight: Subscribable<T> | T,
  toWeight: Subscribable<T> | T,
  precision: Subscribable<number> | number = 3,
): MonoTypeOperatorFunction<number> {
  const fromWeight$ = createOrReturnObservable(fromWeight);
  const toWeight$ = createOrReturnObservable(toWeight);
  const precision$ = createOrReturnObservable(precision);

  return (source) =>
    source.pipe(
      withLatestFrom(fromWeight$, toWeight$, precision$),
      map<[number, string, string, number], number>(([value, fromWeightValue, toWeightValue, precisionValue]) => {
        switch (fromWeightValue) {
          case Weights.G: {
            return fromG[toWeightValue](value, precisionValue);
          }
          case Weights.KG: {
            return fromKg[toWeightValue](value, precisionValue);
          }
          case Weights.LB: {
            return fromLb[toWeightValue](value, precisionValue);
          }
          case Weights.OZ: {
            return fromOz[toWeightValue](value, precisionValue);
          }
          case Weights.ST: {
            return fromSt[toWeightValue](value, precisionValue);
          }
          /* istanbul ignore next-line */
          default:
            return value;
        }
      }),
    );
}
