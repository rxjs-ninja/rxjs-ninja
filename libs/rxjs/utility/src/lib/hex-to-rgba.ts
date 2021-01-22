/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertHexToRGBA } from '../utils/colour';

/**
 * Returns an Observable that emits a string containing a `rgb` or `rgba`  colour converted from a source hex string
 *
 * @category Colour
 *
 * @param alpha Optional Alpha to include if converting 3-part hex colours to rgba
 *
 * @example
 * Returns rgb results from hex colour strings
 * ```ts
 * const input = ['#000000', '#ffffff', '#00ff00'];
 * from(input).pipe(hexToRGBA()).subscribe();
 * ```
 * Output: `'rgb(0, 0, 0)', 'rgb(255, 255, 255)', 'rgb(0, 255, 0)'`
 *
 * @example
 * Returns rgba results from hex colour strings with opacity
 * ```ts
 * const input = ['#000000', '#ffffff', '#00ff00'];
 * from(input).pipe(hexToRGBA(0.5)).subscribe();
 * ```
 * Output: `'rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 255, 0.5)', 'rgba(0, 255, 0, 0.5)'`
 *
 * @example
 * Returns rgba results from hex colour strings
 * ```ts
 * const input = ['000000ff', 'ffffff80', '00ff00e6'];
 * from(input).pipe(hexToRGBA()).subscribe();
 * ```
 * Output: `'rgba(0, 0, 0, 1)', 'rgba(255, 255, 255, 0.5)', 'rgba(0, 255, 0, 0.9)'`
 *
 * @returns Observable that emits a string containing a HTML hex colour
 */
export function hexToRGBA(alpha?: number): MonoTypeOperatorFunction<string> {
  return (source) => source.pipe(map((value) => convertHexToRGBA(value, alpha)));
}
