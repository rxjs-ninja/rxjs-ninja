/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { FormType } from '../types/normalize';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a string made from a source unicode string using String.normalize
 *
 * @category Mapping
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
export function normalize(form?: Subscribable<FormType> | FormType): MonoTypeOperatorFunction<string> {
  const form$ = createOrReturnObservable(form);
  return (source) =>
    source.pipe(
      withLatestFrom(form$),
      map(([value, formValue]) => value.normalize(formValue)),
    );
}
