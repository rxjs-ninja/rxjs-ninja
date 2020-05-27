/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PadPosition, PadPositionValue } from '../types/position';

/**
 * The `padString` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a padded string based on the passed position and length
 *
 * This operator is based on both [String.prototype.padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) and
 * [String.prototype.padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) but
 * provide a single API via [[PadPosition]] option
 *
 * @param padPosition The position to pad the string at, either 'start' or 'end'
 * @param maxLength Pads the string to this length
 *
 * @example
 * ```ts
 * fromString('12345')
 *  .pipe(padString('start', 7))
 *  .subscribe(console.log) // '  12345'
 * ```
 *
 * @returns String that is formatted with deafult space padding
 * @category RxJS String Formatting
 */
function padString(padPosition: PadPositionValue, maxLength: number): MonoTypeOperatorFunction<string>;
/**
 *
 * @param padPosition The position to pad the string at, either 'start' or 'end'
 * @param maxLength Pads the string to this length
 * @param fillString Character or character to use for padding
 *
 *
 * @example
 * ```ts
 * fromString('12345')
 *  .pipe(padString('end', 10, 'X'))
 *  .subscribe(console.log) // '12345XXXXX'
 * ```
 *
 * @returns String that is formatted with padding using the `fillString`
 * @category RxJS String Formatting
 */
function padString(
  padPosition: PadPositionValue,
  maxLength: number,
  fillString: string,
): MonoTypeOperatorFunction<string>;
function padString(
  padPosition: PadPositionValue,
  maxLength: number,
  fillString?: string,
): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) =>
    source.pipe(
      map((value) => {
        switch (padPosition) {
          case PadPosition.END: {
            return value.padEnd(maxLength, fillString);
          }
          case PadPosition.START:
          default:
            return value.padStart(maxLength, fillString);
        }
      }),
    );
}

export { padString };

/**
 * The `padStart` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a string with it's start padded
 * This operator is based on [String.prototype.padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
 *
 * @param maxLength Pads the string to this length
 * @param fillString Optional string to fill in the padding
 *
 * @example
 * ```ts
 * fromString('12345')
 *  .pipe(padStart(7, '.'))
 *  .subscribe(console.log) // '..12345'
 * ```
 *
 * @returns String that is formatted with space padding
 * @category RxJS String Formatting
 */
export function padStart(maxLength: number, fillString?: string): MonoTypeOperatorFunction<string> {
  return padString(PadPosition.START, maxLength, fillString);
}

/**
 * The `padEnd` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a string with it's end padded
 *
 * This operator is based on [String.prototype.padEnd](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)
 *
 * @param maxLength Pads the string to this length
 * @param fillString Optional string to fill in the padding
 *
 * @example
 * ```ts
 * fromString('12345')
 *  .pipe(padEnd(7, '.'))
 *  .subscribe(console.log) // '12345..'
 * ```
 *
 * @returns String that is formatted with space padding
 * @category RxJS String Formatting
 */
export function padEnd(maxLength: number, fillString?: string): MonoTypeOperatorFunction<string> {
  return padString(PadPosition.START, maxLength, fillString);
}
