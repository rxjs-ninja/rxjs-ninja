import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, ObservableInput, OperatorFunction } from 'rxjs';

/**
 * A method that takes a string value and returns and observable value from a service
 * or HTTP request
 */
export type QueryMethod<T> = (query: string) => ObservableInput<T>;

/**
 * Debounce a search query, takes a function that takes a string as it's parameter and returns an observable of results
 * @param time The time to debounce
 * @param queryMethod The method that returns the search
 */
export function debounceWithQuery<T>(time: number, queryMethod: QueryMethod<T>): OperatorFunction<string, T> {
  return (source: Observable<string>) => source.pipe(debounceTime(time), distinctUntilChanged(), switchMap(queryMethod));
}
