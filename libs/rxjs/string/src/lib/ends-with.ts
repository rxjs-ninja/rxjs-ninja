import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns if a string ends with a passed character, an optional length to look at the string can be passed
 * @param character
 * @param length
 */
export function endsWith(character: string, length?: number): OperatorFunction<string, boolean> {
  return (source: Observable<string>) => source.pipe(map(value => value.endsWith(character, length)));
}
