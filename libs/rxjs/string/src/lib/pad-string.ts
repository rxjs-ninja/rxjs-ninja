import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The position to do the string padding at
 */
export type PadPosition = 'start' | 'end';

/**
 * Pads a string - can pad from the start or end and to a specified length.
 * An optional string can be provided as the fill string, the default is `0`
 * @param padPosition
 * @param maxLength
 * @param fillString
 */
export function padString(padPosition: PadPosition, maxLength: number, fillString?: string): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) =>
    source.pipe(
      map(value => {
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
