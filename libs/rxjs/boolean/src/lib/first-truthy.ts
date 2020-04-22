import { MonoTypeOperatorFunction, Observable, throwError } from 'rxjs';
import { catchError, first, onErrorResumeNext } from 'rxjs/operators';

/**
 * Returns the first truthy value from a source
 */
export function firstTruthy(): MonoTypeOperatorFunction<unknown> {
  return (source: Observable<unknown>) => source.pipe(first(Boolean), onErrorResumeNext());
}
