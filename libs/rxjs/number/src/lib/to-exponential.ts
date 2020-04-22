import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns the exponential number
 * @param exponential
 */
export function toExponential(exponential: number): OperatorFunction<number, string> {
  return (source: Observable<number>) => source.pipe(map(value => value.toExponential(exponential)));
}
