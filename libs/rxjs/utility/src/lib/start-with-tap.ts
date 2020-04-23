import { MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

/**
 * Start with a initial tap method before continuing, useful for subscribing
 * to form changes that require a touch method to be called
 * @param callback The callback to be executed
 *
 * @example
 *
 * form.valueChange.pipe(
 *  startWithTap(() => this.onTouch())
 * ).subscribe()
 */
export function startWithTap<T>(callback: () => void): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) =>
    of(undefined).pipe(
      tap(callback),
      switchMap(() => source),
    );
}
