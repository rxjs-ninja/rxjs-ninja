import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, ObservableInput, OperatorFunction } from 'rxjs';

/**
 * A method that takes a string value and returns and observable value from a service
 * or HTTP request
 */
export type QueryMethod<T> = (query: string) => ObservableInput<T>;

/**
 * Operator that takes an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} string value
 * and debounces it by the `time` parameter, and checks that the value changes.
 * When the debounce completes the `queryMethod` is called and the result returned.
 * @param time The time to debounce the query by
 * @param queryMethod The method that returns the search
 *
 * @returns An {@link https://rxjs-dev.firebaseapp.com/api/index/type-alias/ObservableInput|ObservableInput} of T
 */
export function debounceWithQuery<T = unknown>(time: number, queryMethod: QueryMethod<T>): OperatorFunction<string, T> {
  return (source: Observable<string>) => source.pipe(debounceTime(time), distinctUntilChanged(), switchMap(queryMethod));
}
