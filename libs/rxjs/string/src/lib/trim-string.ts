/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrimPosition, TrimPositionValue } from '../types/position';

/**
 * The `trimString` operator can be used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * value and returns a trimmed string
 *
 * @param position The position to trim the string from, either 'start', 'end' or 'all'
 *
 * @remarks
 * This operator is based on [String.prototype.trim](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim),
 * [trimStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart) and
 * [trimEnd](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd) but
 * provide a single API via [[TrimPosition]] option
 *
 * @example
 * ```ts
 * fromString('     12345     ')
 *  .pipe(trimString('end'))
 *  .subscribe(console.log) // '     12345'
 * ```
 *
 * @returns String that is trimmed based on the [[TrimPosition]] option
 * @category RxJS String Formatting
 */
export function trimString(position: TrimPositionValue = 'all'): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) =>
    source.pipe(
      map((value) => {
        switch (position) {
          case TrimPosition.START: {
            return value.trimLeft();
          }

          case TrimPosition.END: {
            return value.trimRight();
          }
          case TrimPosition.ALL:
          default:
            return value.trim();
        }
      }),
    );
}
