import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Takes an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} string and returns a boolean
 * value if the string ends with a passed character
 * @param character The character to check
 * @param length The length of the string to check
 */
export function endsWith(character: string, length?: number): OperatorFunction<string, boolean> {
  return (source: Observable<string>) => source.pipe(map(value => value.endsWith(character, length)));
}
