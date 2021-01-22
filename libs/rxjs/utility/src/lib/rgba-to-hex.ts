/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertRGBAStrToHexComponents } from '../utils/colour';

/**
 * Returns an Observable that emits a string containing a HTML hex colour converted from a source rgba string
 *
 * @category Colour
 *
 * @param excludeHash Optional boolean to exclude the hash (`#`) character from the return result
 *
 * @example
 * Returns hex results from rgba colour strings
 * ```ts
 * const input = ['rgba(0,0,0,1)', 'rgba(255,255,255,0.5)', 'rgba(0,255,0,0.9)'];
 * from(input).pipe(rgbaToHex()).subscribe();
 * ```
 * Output: `'#000000ff', '#ffffff80', '#00ff00e6'`
 *
 * @example
 * Returns hex results from rgba colour strings excluding hash
 * ```ts
 * const input = ['rgba(0,0,0,1)', 'rgba(255,255,255,0.5)', 'rgba(0,255,0,0.9)'];
 * from(input).pipe(rgbaToHex(true)).subscribe();
 * ```
 * Output: `'000000ff', 'ffffff80', '00ff00e6'`
 *
 * @returns Observable that emits a string containing a HTML hex colour
 */
export function rgbaToHex(excludeHash?: boolean): MonoTypeOperatorFunction<string> {
  return (source) =>
    source.pipe(
      map((input) => convertRGBAStrToHexComponents(input)),
      map((hexColour) => (excludeHash ? `${hexColour.join('')}` : `#${hexColour.join('')}`)),
    );
}
