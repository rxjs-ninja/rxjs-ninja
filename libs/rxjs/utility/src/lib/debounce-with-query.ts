/**
 * @packageDocumentation
 * @module Utility
 */
import { OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { QueryMethod } from '../types/utility';

/**
 * Returns an Observable value from a remote source where the [[QueryMethod]] returns a result such as a search from
 * a remote location
 *
 * @category Mapping
 *
 * @param time The debounce time before the query method is executed
 * @param queryMethod The method that returns the search
 *
 * @typeParam T The response from an API which returns the result of a query
 *
 * @example
 * On keypress of an input pass value and debounce for `500ms` before sending to remote server request
 * ```ts
 * const doQuery = (query: string) => http.get(`/search?query=${query}`);
 * fromEvent(input, 'keyup').pipe(map(event => event.target.value), debounceWithQuery(500, doQuery)).subscribe();
 * ```
 * Output: `A valid server response containing search results`
 *
 * @returns An Observable that emits a value from a server request
 */
export function debounceWithQuery<T extends unknown>(
  time: number,
  queryMethod: QueryMethod<T>,
): OperatorFunction<string, T> {
  return (source) => source.pipe(debounceTime(time), distinctUntilChanged(), switchMap(queryMethod));
}
