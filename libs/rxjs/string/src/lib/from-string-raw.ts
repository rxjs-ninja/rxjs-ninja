/**
 * @packageDocumentation
 * @module String
 */
import { Observable, of } from 'rxjs';

/**
 * Returns an Observable string built with `String.raw` from a template and substitution values.
 *
 * @category String
 *
 * @param template Template string array from a tagged template literal
 * @param substitutions Values substituted into the template
 *
 * @returns Observable that emits the raw string once
 */
export function fromStringRaw(
  template: TemplateStringsArray | readonly string[],
  ...substitutions: unknown[]
): Observable<string> {
  return of(String.raw(template as TemplateStringsArray, ...substitutions));
}
