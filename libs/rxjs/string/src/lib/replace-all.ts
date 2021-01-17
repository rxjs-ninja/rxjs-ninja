/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string, replacing text in the source string with the replacement text if the
 * pattern is found using String.replaceAll
 *
 * @category String Modify
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
  pattern: string | RegExp | ObservableInput<string | RegExp>,
  replacement: string | ObservableInput<string>,
): MonoTypeOperatorFunction<string> {
  const pattern$ = (isObservable(pattern) ? pattern : of(pattern)) as Observable<string | RegExp>;
  const replacement$ = (isObservable(replacement) ? replacement : of(replacement)) as Observable<string>;
  return (source: Observable<string>) =>
    source.pipe(
      withLatestFrom(pattern$, replacement$),
      map(([value, patternInput, replacementInput]) => value.replaceAll(patternInput, replacementInput)),
    );
}
