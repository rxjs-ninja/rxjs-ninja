import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns the string character at a position passed as the parameter to this method
 * @param position The position for the character to return, starts at 0
 */
export function charAt(position: number): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map(value => value.charAt(position)));
}
