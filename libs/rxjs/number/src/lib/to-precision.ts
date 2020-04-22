import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns a number to a string representation based on the passed precision
 * @param precision
 */
export function toPrecision(precision: number): OperatorFunction<number, string> {
  return (source: Observable<number>) => source.pipe(map(value => value.toPrecision(precision)));
}
