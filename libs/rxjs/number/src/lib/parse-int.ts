import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Parses a string to an integer
 * @param radix
 */
export function parseInt(radix = 10) {
  return (source: Observable<string>) => source.pipe(map(value => Number.parseInt(value, radix)));
}
