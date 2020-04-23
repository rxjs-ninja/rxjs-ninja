import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Takes an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} string value and returns
 * the character at the specified 0-index position
 *
 * @param position The position for the character to return
 */
export function charAt(position: number): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map(value => value.charAt(position)));
}
