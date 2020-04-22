import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The available positions to trim a string at
 */
export type TrimPosition = 'left' | 'right' | 'all';

/**
 * Trims a string from an input Observable, the default behaviour is to trim a string
 * of all preceding and trailing white space.
 *
 * The operator takes an optional option of `left` or 'right` to only trim before or after the string
 * @param position The position to apply a trim at
 */
export function trimString(
  position: TrimPosition = 'all'
): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) =>
    source.pipe(
      map(value => {
        switch (position) {
          case 'left': {
            return value.trimLeft();
          }

          case 'right': {
            return value.trimRight();
          }
          case 'all':
          default:
            return value.trim();
        }
      })
    );
}
