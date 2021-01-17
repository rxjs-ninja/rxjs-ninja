/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string, replacing text in the source string with the replacement text if the
 * pattern is found using String.replace
 *
 * @category String Modify
 *
 * @param pattern A string or RegExp to find in the Observable string to replace
 * @param replacement The replacement string
 *
 * @example
 * Return a string with first instance `Hero` replaced with `Ninja`
 * ```ts
 * of('RxJS Hero, Angular Hero').pipe(replace('Hero', 'Ninja')).subscribe();
 * ```
 * Output: `RxJS Ninja, Angular Hero`
 *
 * @example
 * Return a string where `Hero` is replaced with `Ninja` using a RegExp
 * ```ts
 * of('RxJS Hero, Angular Hero').pipe(replace(/(?!\w+\s)(\w+)/, 'Ninja')).subscribe();
 * ```
 * Output: `RxJS Ninja, Angular Hero`
 *
 * @returns Observable that emits a string
 */
export function replace(
  pattern: string | RegExp | ObservableInput<string | RegExp>,
  replacement: string | ObservableInput<string>,
): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) =>
    source.pipe(
      withLatestFrom(
        (isObservable(pattern) ? pattern : of(pattern)) as Observable<string | RegExp>,
        (isObservable(replacement) ? replacement : of(replacement)) as Observable<string>,
      ),
      map(([value, patternInput, replacementInput]) => value.replace(patternInput, replacementInput)),
    );
}
