/**
 * @packageDocumentation
 * @module string
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `split` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} string
 * value and returns an array of strings based on the original string split on the separator
 *
 * @param separator The character to split the string at
 * @param limit Optional limit for the number of times to split
 *
 * @remarks
 * This operator is based on [String.prototype.split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
 *
 * @example
 * ```ts
 * from(['Hello|World'])
 *  .pipe(split('|'))
 *  .subscribe(....) // ['Hello', 'World']
 * ```
 *
 * @returns Array of strings based on the original string split by the separator
 * @category RxJS String Query
 */
export function split(separator: string, limit?: number): OperatorFunction<string, string[]> {
  return (source: Observable<string>) => source.pipe(map((value) => value.split(separator, limit)));
}
