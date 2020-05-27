/**
 * @packageDocumentation
 * @module utility
 */
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, ObservableInput, OperatorFunction } from 'rxjs';

/**
 * A function passed to [[debounceWithQuery]] as the second parameter, takes a string
 * from an [Observable](https://rxjs.dev/api/index/class/Observable) source and returns an
 * observable result of T
 *
 * @typeParam T The response from an API which returns the result of a query
 *
 * @param query The string to send to the query method
 */
export type QueryMethod<T> = (query: string) => ObservableInput<T>;

/**
 * Operator that takes an [Observable](https://rxjs.dev/api/index/class/Observable) string value
 * and debounces it by the `time` parameter, and checks that the value changes.
 * When the debounce completes the `queryMethod` is called and the result returned.
 *
 * @param time The time to debounce the query by
 * @param queryMethod The method that returns the search
 *
 * @typeParam T The response from an API which returns the result of a query
 *
 * @example
 * ```ts
 * const doQuery = (query: string) => http.get(`/search?query=${query}`)
 *
 * fromEvent(input, 'keyup')
 *  .pipe(debounceWithQuery(500, doQuery))
 *  .subscribe(console.log)
 * ```
 *
 * @returns An [Observable](https://rxjs.dev/api/index/class/Observable) value of T
 * @category RxJS Observable Utilities
 */
export function debounceWithQuery<T = unknown>(time: number, queryMethod: QueryMethod<T>): OperatorFunction<string, T> {
  return (source: Observable<string>) => source.pipe(debounceTime(time), distinctUntilChanged(), switchMap(queryMethod));
}
