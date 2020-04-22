import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable value of a number being a safe integer value
 */
export function isSafeInteger(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) => source.pipe(map(value => Number.isSafeInteger(value)));
}
