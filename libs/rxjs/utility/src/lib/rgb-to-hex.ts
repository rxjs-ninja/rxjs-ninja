/**
 * @packageDocumentation
 * @module Colour
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertRGBAStrToHexComponents } from '../utils/colour';

/**
 * Returns an Observable that emits a string containing a HTML hex colour converted from a source rgb string
 *
 * @category Colour
 *
 * @param excludeHash Optional boolean to exclude the hash (`#`) character from the return result
 *
 * @example
 * Returns hex results from rgb colour strings
 * ```ts
 * const input = ['rgb(0,0,0)', 'rgb(255,255,255)', 'rgb(0,255,0)'];
 * from(input).pipe(rgbToHex()).subscribe();
 * ```
 * Output: `'#000000', '#ffffff', '#00ff00'`
 *
 * @example
 * Returns hex results from rgb colour strings excluding hash
 * ```ts
 * const input = ['rgb(0,0,0)', 'rgb(255,255,255)', 'rgb(0,255,0)'];
 * from(input).pipe(rgbToHex(true)).subscribe();
 * ```
 * Output: `'000000', 'ffffff', '00ff00'`
 *
 * @returns Observable that emits a string containing a HTML hex colour
 */
export function rgbToHex(excludeHash?: boolean): MonoTypeOperatorFunction<string> {
  return (source) =>
    source.pipe(
      map((input) => convertRGBAStrToHexComponents(input)),
      map(([red, green, blue]) => (excludeHash ? `${red}${green}${blue}` : `#${red}${green}${blue}`)),
    );
}
