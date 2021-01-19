/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a string, replacing text in the source string with the replacement text if the
 * pattern is found using String.replaceAll
 *
 * @category Modify
 *
 * @param pattern A string or RegExp to find in the Observable string to replace
 * @param replacement The replacement string
 *
 * @example
 * Return a string with all instances of `Hero` replaced with `Ninja`
 * ```ts
 * of('RxJS Hero, Angular Hero').pipe(replaceAll('Hero', 'Ninja')).subscribe();
 * ```
 * Output: `RxJS Ninja, Angular Ninja`
 *
 * @example
 * Return a string where `Hero` is replaced with `Ninja` using a RegExp
 * ```ts
 * of('RxJS Hero, Angular Hero').pipe(replaceAll(/(?!\w+\s)(\w+)/g, 'Ninja')).subscribe();
 * ```
 * Output: `RxJS Ninja, Angular Ninja`
 *
 * @returns Observable that emits a string
 */
export function replaceAll(
  pattern: Subscribable<string | RegExp> | string | RegExp,
  replacement: Subscribable<string> | string,
): MonoTypeOperatorFunction<string> {
  const pattern$ = createOrReturnObservable(pattern);
  const replacement$ = createOrReturnObservable(replacement);
  return (source) =>
    source.pipe(
      withLatestFrom(pattern$, replacement$),
      map(([value, patternValue, replacementValue]) => value.replaceAll(patternValue, replacementValue)),
    );
}
