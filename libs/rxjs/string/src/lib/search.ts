/**
 * @packageDocumentation
 * @module String
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `search` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns the start index of a search result
 *
 * This operator is based on [String.prototype.matchAll](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 *
 * @param pattern A RegExp to match in the string
 *
 * @example
 * ```ts
 * fromString('table football, foosball')
 *  .pipe(matchAll(new RegExp('foo[a-z]*', 'g'))
 *  .subscribe(result => console.log(Array.from(result))) // [ 'football', 'foosball' ]
 * ```
 *
 * @returns RegExpMatchArray that contains one or more results from the match
 * @category RxJS String Query
 */

export function search(pattern: string | RegExp): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map((value) => value.search(pattern)));
}
