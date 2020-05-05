import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Takes an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} string and returns the string value
 * if it ends with a specified character
 * @param character The character to check
 * @param length The length of the string to check
 */
export function fromEndsWith(character: string, length?: number): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.endsWith(character, length) && value));
}
