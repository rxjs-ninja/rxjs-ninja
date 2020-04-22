import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns the string character code at a position passed as the parameter to this method
 * @param position The position for the character to return, starts at 0
 */
export function charCodeAt(position: number): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map(value => value.charCodeAt(position)));
}
