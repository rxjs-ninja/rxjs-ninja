import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Parses a string to number
 */
export function parseFloat(): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map(value => Number.parseFloat(value)));
}
