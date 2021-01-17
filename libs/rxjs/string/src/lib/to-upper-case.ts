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
 * @category String Modify
 *
 * @param locales Optional locales to pass for string formatting
 *
 * @example
 * Returns an upper case string
 * ```ts
 * of('apple').pipe(toUpperCase()).subscribe();
 * ```
 * Output: `'APPLE'`
 *
 * @example
 * Returns an lower case string with locale
 * ```ts
 * of('äpfel').pipe(toUpperCase('de-DE')).subscribe();
 * ```
 * Output: `'ÄPFEL'`
 *
 * @returns Observable that emits a lower case string
 */
export function toUpperCase(
  locales?: ArrayOrSet<string> | string | Observable<ArrayOrSet<string> | string>,
): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) =>
    source.pipe(
      withLatestFrom((isObservable(locales) ? locales : of(locales)) as Observable<ArrayOrSet<string> | string>),
      map(([value, inputValue]) =>
        isArrayOrSet(locales)
          ? value.toLocaleUpperCase([...inputValue])
          : value.toLocaleUpperCase(inputValue as string),
      ),
    );
}
