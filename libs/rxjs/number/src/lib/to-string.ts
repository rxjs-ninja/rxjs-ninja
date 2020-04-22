import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Converts an Observable number value to a string, and supports passing a radix
 * to convert to different base values
 * @param radix
 */
export function toString(radix = 10): OperatorFunction<number, string> {
  return (source: Observable<number>) => source.pipe(map(number => number.toString(radix)));
}
