import { MonoTypeOperatorFunction, Observable, throwError } from 'rxjs';
import { catchError, first, onErrorResumeNext } from 'rxjs/operators';

/**
 * Returns the first truthy item from an Observable source, in this case it does
 * not error when there is no item, allowing logic to continue based on this
 * result
 *
 * @example
 * let positionCount = 0;
 *
 * from([false, false, false, false, true])
 * .pipe(
 *    tap(() => positionCount++)
 *    firstTruthy()
 *  ).subscribe()
 */
export function firstTruthy<T>(): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => source.pipe(first<T>(Boolean), onErrorResumeNext());
}
