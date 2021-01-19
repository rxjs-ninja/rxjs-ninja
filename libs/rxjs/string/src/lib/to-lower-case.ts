/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { ArrayOrSet } from '../types/array-set';
import { isArrayOrSet } from '../utils/array-set';

/**
 * Returns an Observable that emits a string where the source string is passed through String.toLocaleLowerCase
 *
 * @category Modify
 *
 * @param locales Optional locales to pass for string formatting
 *
 * @example
 * Returns an lower case string
 * ```ts
 * of('APPLE').pipe(toLowerCase()).subscribe();
 * ```
 * Output: `'apple'`
 *
 * @example
 *  * Returns an lower case string with locale
 * ```ts
 * of('ÄPFEL').pipe(toLowerCase('de-DE')).subscribe();
 * ```
 * Output: `'äpfel'`
 *
 * @returns Observable that emits a lower case string
 */
export function toLowerCase(
  locales?: ArrayOrSet<string> | string | Observable<ArrayOrSet<string> | string>,
): MonoTypeOperatorFunction<string> {
  const locales$ = (isObservable(locales) ? locales : of(locales)) as Observable<ArrayOrSet<string> | string>;
  return (source: Observable<string>) =>
    source.pipe(
      withLatestFrom(locales$),
      map(([value, inputValue]) =>
        isArrayOrSet(inputValue)
          ? value.toLocaleLowerCase([...inputValue])
          : value.toLocaleLowerCase(inputValue as string),
      ),
    );
}
