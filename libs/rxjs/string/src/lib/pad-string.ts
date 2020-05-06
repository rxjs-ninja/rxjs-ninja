/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PadPosition } from '../types/position';

/**
 * The `padString` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} string
 * value and returns a padded string based on the passed position and length
 *
 * @param padPosition The position to pad the string at, either 'start' or 'end'
 * @param maxLength Pads the string to this length
 * @param fillString Optional character or character to use for padding
 *
 * @remarks
 * This operator is based on both [String.prototype.padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) and
 * [String.prototype.padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) but
 * provide a single API via [[PadPosition]] option
 *
 * @example
 * ```ts
 * from(['12345'])
 *  .pipe(padString('end', 10, 'X'))
 *  .subscribe(....) // ['12345XXXXX']
 * ```
 *
 * @returns String that is formatted with padding
 * @category RxJS String Formatting
 */
export function padString(padPosition: PadPosition, maxLength: number, fillString?: string): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) =>
    source.pipe(
      map((value) => {
        switch (padPosition) {
          case 'end': {
            return value.padEnd(maxLength, fillString);
          }
          case 'start':
          default:
            return value.padStart(maxLength, fillString);
        }
      }),
    );
}
