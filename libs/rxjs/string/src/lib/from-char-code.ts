/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPromise } from 'rxjs/internal-compatibility';

/**
 * Returns an Observable that emits a string made from character codes using String.fromCharCode
 *
 * @remarks This operator will emit a single string for all input passed including arrays
 *
 * @see The [[mapCharCode]] operator can be used to map an Observable source of char codes to strings
 *
 * @category String Observables
 *
 * @param charCodes Observable input, Promise, Array or argument list of character codes
 *
 * @example
 * Return a string from character code arguments
 * ```ts
 * fromCharCode(82, 120, 74, 83).subscribe();
 * ```
 * Output: `RxJS`
 *
 * @example
 * Return a string from character code array
 * ```ts
 * fromCharCode([82, 120, 74, 83]).subscribe();
 * ```
 * Output: `RxJS`
 *
 * @example
 * Return a string from character code Observable
 * ```ts
 * fromCharCode(of([82, 120, 74, 83]).subscribe();
 * ```
 * Output: `RxJS`
 *
 * @returns Observable that emits a string
 */
export function fromCharCode<
  T extends ObservableInput<number | number[]> | PromiseLike<number | number[]> | number | number[]
>(...charCodes: T[]): Observable<string> {
  if (isObservable(charCodes[0])) {
    return ((charCodes[0] as never) as Observable<number[]>).pipe(map((input) => String.fromCharCode(...input)));
  } else if (isPromise(charCodes[0])) {
    return new Observable<string>((subscriber: Subscriber<unknown>): void => {
      ((charCodes[0] as never) as Promise<number[]>).then(
        (input) => {
          if (!subscriber.closed) {
            subscriber.next(String.fromCharCode(...input));
            subscriber.complete();
          }
        },
        (err) => subscriber.error(err),
      );
    });
  } else {
    const value = Array.isArray(charCodes[0]) ? (charCodes[0] as number[]) : ([...charCodes] as number[]);
    return new Observable<string>((subscriber: Subscriber<string>): void => {
      subscriber.next(String.fromCharCode(...value));
      subscriber.complete();
    });
  }
}
