/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { split } from './split';
import { map } from 'rxjs/operators';

/**
 * The `titleize` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a string that is titleized (first letter of each word uppercase)
 *
 * [String.prototype.toLocaleUpperCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase) to handle
 * upper case so supports locales.
 *
 * @remarks
 * This is a custom operator for this library and uses a method found on [1loc](https://1loc.dev/), it uses
 *
 * @example
 * ```ts
 * fromString('Mary had a little lamb')
 *  .pipe(titleize())
 *  .subscribe(console.log) // 'Mary Had A Little Lamb'
 * ```
 *
 * @returns String that is titleized
 * @category RxJS String Formatting
 */
function titleize(): MonoTypeOperatorFunction<string>;
/**
 *
 * @param locales Locales to pass for string formatting
 *
 * @example
 * ```ts
 * fromString('Mary had ä little lamb')
 *  .pipe(titleize('de-DE'))
 *  .subscribe(console.log) // 'Mary Had Ä Little Lamb'
 * ```
 *
 * @returns String that is titleized
 * @category RxJS String Formatting
 */
function titleize(locales: string | string[]): MonoTypeOperatorFunction<string>;
/**
 * @param locales Locales to pass for string formatting
 * @param separator Separator if the string isn't using space characters
 *
 * @example
 * ```ts
 * fromString('john,paul,john,ringo')
 *  .pipe(titleize('en-GB', ','))
 *  .subscribe(console.log) // 'John,Paul,John,Ringo'
 * ```
 *
 * @returns String that is titleized with custom separator
 * @category RxJS String Formatting
 */
function titleize(locales: string | string[], separator): MonoTypeOperatorFunction<string>;
function titleize(locales?: string | string[], separator = ' '): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) =>
    source.pipe(
      split(separator),
      map((values) =>
        values.map((word) => `${word.charAt(0).toLocaleUpperCase(locales)}${word.slice(1)}`).join(separator),
      ),
    );
}

export { titleize };
