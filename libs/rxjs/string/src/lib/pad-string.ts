/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PadPosition, PadPositionValue } from '../types/position';

/**
 * The `padString` operator can be used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * value and returns a padded string based on the passed position and length
 *
 * @param padPosition The position to pad the string at, either 'start' or 'end'
 * @param maxLength Pads the string to this length
 *
 * @remarks
 * This operator is based on both [String.prototype.padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) and
 * [String.prototype.padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) but
 * provide a single API via [[PadPosition]] option
 *
 * @example
 * ```ts
 * fromString('12345')
 *  .pipe(padString('start', 7))
 *  .subscribe(console.log) // ['  12345']
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
 *  .subscribe(console.log) // ['12345XXXXX']
 * ```
 *
 * @returns String that is formatted with padding using the `fillString`
 * @category RxJS String Formatting
 */
function padString(padPosition: PadPositionValue, maxLength: number, fillString: string): MonoTypeOperatorFunction<string>;
function padString(padPosition: PadPositionValue, maxLength: number, fillString?: string): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) =>
    source.pipe(
      map((value) => {
        switch (padPosition) {
          case PadPosition.START: {
            return value.padEnd(maxLength, fillString);
          }
          case PadPosition.END:
          default:
            return value.padStart(maxLength, fillString);
        }
      }),
    );
}

export { padString };
