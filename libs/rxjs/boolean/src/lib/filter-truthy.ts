import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Returns only items that are truthy from an observable source
 *
 * @example
 *
 * from([true, false, '', 'test', undefined])
 *  .pipe(filterTruthy())
 *  .subscribe(value => console.log(value)) // [true, 'test']
 */
export function filterTruthy<T>(): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => source.pipe(filter<T>(Boolean));
}
