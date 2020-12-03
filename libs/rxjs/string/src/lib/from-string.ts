/**
 * @packageDocumentation
 * @module String
 */
import { Observable, Subscriber } from 'rxjs';

/**
 * Returns an Observable from string arguments or an array of strings and emits string
 *
 * @param args Strings or an Array of strings to emit
 *
 * @example
 * ```ts
 * fromString('Foobar')..pipe(reverse()).subscribe(); // 'rabooF'
 * ```
 *
 * @example
 * ```ts
 * fromString('Foo', 'Bar')..pipe(reverse()).subscribe(); // ['ooF', 'raB']
 * ```
 *
 * @example
 * ```ts
 * fromString(['Foo', 'Bar'])..pipe(reverse()).subscribe(); // ['ooF', 'raB']
 * ```
 *
 * @returns Observable that emits a string
 * @category RxJS String Creation
 */
export function fromString<T extends string | string[]>(...args: T[]): Observable<string> {
  const value = Array.isArray(args[0]) ? (args[0] as string[]) : ([...args] as string[]);
  return new Observable<string>((subscriber: Subscriber<string>): void => {
    for (let i = 0; i < value.length; i++) {
      subscriber.next(value[i]);
    }
    subscriber.complete();
  });
}
