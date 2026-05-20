/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable string using `String.prototype.toUpperCase` (not locale-aware).
 *
 * @category Modify
 *
 * @see [[toUpperCase]] for locale-aware uppercasing
 *
 * @returns Observable that emits an uppercased string
 */
export function asciiUpperCase(): MonoTypeOperatorFunction<string> {
  return (source) => source.pipe(map((value) => value.toUpperCase()));
}
