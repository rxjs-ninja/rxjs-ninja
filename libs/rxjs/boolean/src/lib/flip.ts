import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * This operator takes a boolean value and flips to the opposite value
 */
export function flip(): MonoTypeOperatorFunction<boolean> {
  return (source: Observable<boolean>) => source.pipe(map((value) => !value));
}
