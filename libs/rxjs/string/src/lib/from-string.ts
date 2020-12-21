/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, Subscriber } from 'rxjs';
import { isPromise } from 'rxjs/internal-compatibility';

/**
 * Returns an Observable that emits strings from any an argument list of strings or  supported Observable, Promise or
 * Array-like source
 *
 * @category String Observables
 *
 * @remarks This operator is a type-safe {@link https://rxjs.dev/api/index/function/from|from} and will emit only
 * strings, also unlike `from` a single string is not converted into an array-like.
 *
 * @param input Argument list, Observable input, Promise or Array of strings
 *
 * @example
 * Return a reversed string from an argument list of strings
 * ```ts
 * fromString('RxJS', 'Ninja').pipe(reverse()).subscribe();
 * ```
 * Output: `'SJxR', 'ajniN'`
 *
 * @example
 * Return a reversed string from an array list of strings
 * ```ts
 * fromString(['RxJS', 'Ninja']).pipe(reverse()).subscribe();
 * ```
 * Output: `'SJxR', 'ajniN'`
 *
 * @example
 * Return a reversed string from an Observable array list of strings
 * ```ts
 * fromString(of(['RxJS', 'Ninja'])).pipe(reverse()).subscribe();
 * ```
 * Output: `'SJxR', 'ajniN'`
 *
 * @returns Observable that emits a string
 */
export function fromString<T extends ObservableInput<string> | PromiseLike<string> | string | string[]>(
  ...input: T[]
): Observable<string> {
  if (isObservable(input[0])) {
    return (input[0] as never) as Observable<string>;
  } else if (isPromise(input[0])) {
    return new Observable<string>((subscriber: Subscriber<unknown>): void => {
      ((input[0] as never) as Promise<string>).then(
        (value) => {
          if (!subscriber.closed) {
            subscriber.next(value);
            subscriber.complete();
          }
        },
        (err) => subscriber.error(err),
      );
    });
  } else {
    const value = Array.isArray(input[0]) ? (input[0] as string[]) : ([...input] as string[]);
    return new Observable<string>((subscriber: Subscriber<string>): void => {
      for (let i = 0; i < value.length; i++) {
        subscriber.next(value[i]);
      }
      subscriber.complete();
    });
  }
}
