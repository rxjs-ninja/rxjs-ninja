/**
 * @packageDocumentation
 * @module string
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `match` operator can be used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * value and returns an array-like [RegExpMatchArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#Return_value)
 *
 * This operator is based on [String.prototype.match](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 *
 * @param pattern A string value to match in the string
 *
 * @example
 * ```ts
 * fromString('Mary had a little lamb')
 *  .pipe(match('little'))
 *  .subscribe(result => console.log(Array.from(result))) // ['little']
 * ```
 *
 * @returns RegExpMatchArray that contains one or more results from the match
 * @category RxJS String Query
 */
function match(pattern: string): OperatorFunction<string, RegExpMatchArray>;
/**
 * @param pattern A RegExp to match in the string
 *
 * @example
 * ```ts
 * fromString('Mary had a Little Lamb')
 *  .pipe(match(/[A-Z]/g))
 *  .subscribe(result => console.log(Array.from(result))) // ['M', 'L', 'L']
 * ```
 *
 * @returns RegExpMatchArray that contains one or more results from the match
 * @category RxJS String Query
 */
function match(pattern: RegExp): OperatorFunction<string, RegExpMatchArray>;
function match(pattern: string | RegExp): OperatorFunction<string, RegExpMatchArray> {
  return (source: Observable<string>) => source.pipe(map((value) => value.match(pattern)));
}

export { match };
