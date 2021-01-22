/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { convertRGBAStrToHexComponents } from '../utils/colour';
import { createOrReturnObservable } from '../utils/internal';

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
export function rgbaToHex(excludeHash?: Subscribable<boolean> | boolean): MonoTypeOperatorFunction<string> {
  const excludeHash$ = createOrReturnObservable(excludeHash);
  return (source) =>
    source.pipe(
      map((input) => convertRGBAStrToHexComponents(input)),
      withLatestFrom(excludeHash$),
      map(([hexColour, excludeHashValue]) => (excludeHashValue ? `${hexColour.join('')}` : `#${hexColour.join('')}`)),
    );
}
