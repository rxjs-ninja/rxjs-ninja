/**
 * @packageDocumentation
 * @module String
 */
import { Observable } from 'rxjs';
import { subscribeToSingleOrArrayString } from '../utils/from-string.utils';

/**
 * The `fromString` operator is used to create an [Observable](https://rxjs.dev/api/index/class/Observable) string from a passed
 * string value or array of string values.
 *
 * When using fromString with an array, this acts like the [from](https://rxjs.dev/api/index/function/from)
 * operator and emits for each array item
 *
 * @param input The string to create the Observable source from
 *
 * @example
 * ```ts
 * fromString('Foobar')..pipe(reverse()).subscribe(console.log) // 'rabooF'
 * ```
 *
 * @example
 * ```ts
 * fromString(['Foo', 'Bar'])..pipe(reverse()).subscribe(console.log) // ['ooF', 'raB']
 * ```
 *
 * @returns String from the original string, made Observable
 * @category RxJS String Creation
 */
export function fromString(input: string | string[]): Observable<string> {
  return new Observable<string>(subscribeToSingleOrArrayString(input));
}
