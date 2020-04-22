import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns a boolean value of the Observable number being an integer
 */
export function isInteger(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) => source.pipe(map(value => Number.isInteger(value)));
}
