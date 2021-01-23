/**
 * @private
 * @internal
 * Conversion Maps
 */
export interface ConversionMapping {
  [K: string]: (num: number, precision: number) => number;
}
