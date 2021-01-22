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
 * @param from The weight type of the source value
 * @param to The weight type of the output value
 * @param precision The number of decimal places to return, default is `2`
 *
 * @example
 * Return the `Kg` value of the source `St` value to precision `1`
 * ```ts
 * const source$ = from([10, 5, 100]);
 *
 * source$.pipe(weight('st', 'kg')).subscribe()
 * ```
 * Output: `63.5, 31.8, 635`
 *
 * @returns Observable that emits a number that is the `from` [[Weights]] converted to the `to` [[Weights]]
 */
export function weight(
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
          case Weights.G: {
            return fromG[toValue](value, precisionValue);
          }
          case Weights.KG: {
            return fromKg[toValue](value, precisionValue);
          }
          case Weights.LB: {
            return fromLb[toValue](value, precisionValue);
          }
          case Weights.OZ: {
            return fromOz[toValue](value, precisionValue);
          }
          case Weights.ST: {
            return fromSt[toValue](value, precisionValue);
          }
          default:
            return value;
        }
      }),
    );
}
