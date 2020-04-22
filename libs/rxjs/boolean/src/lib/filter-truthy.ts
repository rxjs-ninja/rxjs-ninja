import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Filter a source for only truthy values
 */
export function filterTruthy(): MonoTypeOperatorFunction<unknown> {
  return (source: Observable<unknown>) => source.pipe(filter(Boolean));
}
