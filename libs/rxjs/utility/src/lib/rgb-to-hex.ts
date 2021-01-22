/**
 * @packageDocumentation
 * @module Colour
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { convertRGBAStrToHexComponents } from '../utils/colour';
import { createOrReturnObservable } from 'libs/rxjs/utility/src/utils/internal';

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
export function rgbToHex(excludeHash?: Subscribable<boolean> | boolean): MonoTypeOperatorFunction<string> {
  const excludeHash$ = createOrReturnObservable(excludeHash);
  return (source) =>
    source.pipe(
      map((input) => convertRGBAStrToHexComponents(input)),
      withLatestFrom(excludeHash$),
      map(([[red, green, blue], excludeHashValue]) =>
        excludeHashValue ? `${red}${green}${blue}` : `#${red}${green}${blue}`,
      ),
    );
}
