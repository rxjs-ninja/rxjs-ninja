import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns if a number is finite
 */
export function isFinite(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) => source.pipe(map(value => Number.isFinite(value)));
}
