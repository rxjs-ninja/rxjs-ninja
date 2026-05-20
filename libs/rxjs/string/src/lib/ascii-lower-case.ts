/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable string using `String.prototype.toLowerCase` (not locale-aware).
 *
 * @category Modify
 *
 * @see [[toLowerCase]] for locale-aware lowercasing
 *
 * @returns Observable that emits a lowercased string
 */
export function asciiLowerCase(): MonoTypeOperatorFunction<string> {
  return (source) => source.pipe(map((value) => value.toLowerCase()));
}
