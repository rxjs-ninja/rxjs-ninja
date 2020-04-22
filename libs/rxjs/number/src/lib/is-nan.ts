import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable boolean value if a value is not a number
 */
export function isNaN(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) => source.pipe(map(value => Number.isNaN(value)));
}
