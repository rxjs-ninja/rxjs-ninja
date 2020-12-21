/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormType } from '../types/normalize';

/**
 * Returns an Observable that emits a string made from a source unicode string using String.normalize
 *
 * @category String Mapping
 *
 * @param form The Unicode Normalization Form to decode the string with
 *
 * @example
 * Returns a string from Unicode characters
 * ```ts
 * of('\u0041\u006d\u00e9\u006c\u0069\u0065').pipe(normalize()).subscribe();
 * ```
 * Output: `Amélie`
 *
 * @returns Observable that emits a string
 */
export function normalize(form?: FormType): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.normalize(form)));
}
