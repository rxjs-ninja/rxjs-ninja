/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPromise } from 'rxjs/internal-compatibility';

/**
 * Returns an Observable that emits a string made from code points using String.fromCodePoint
 *
 * @remarks This operator will emit a single string for all input passed including arrays
 *
 * @category String Observables
 *
 * @param charCodes Observable input, Promise, Array or argument list of code points
 *
 * @example
 * Return a string from code points arguments
 * ```ts
 * fromCodePoint(9731, 9733, 9842).subscribe();
 * ```
 * Output: `☃★♲`
 *
 * @example
 * Return a string from code points array
 * ```ts
 * fromCodePoint([9731, 9733, 9842]).subscribe();
 * ```
 * Output: `☃★♲`
 *
 * @example
 * Return a string from code points Observable
 * ```ts
 * fromCodePoint(of([9731, 9733, 9842]).subscribe();
 * ```
 * Output: `☃★♲`
 *
 * @returns Observable that emits a string
 */
export function fromCodePoint<
  T extends ObservableInput<number | number[]> | PromiseLike<number | number[]> | number | number[]
>(...charCodes: T[]): Observable<string> {
  if (isObservable(charCodes[0])) {
    return ((charCodes[0] as never) as Observable<number[]>).pipe(map((input) => String.fromCodePoint(...input)));
  } else if (isPromise(charCodes[0])) {
    return new Observable<string>((subscriber: Subscriber<unknown>): void => {
      ((charCodes[0] as never) as Promise<number[]>).then(
        (input) => {
          if (!subscriber.closed) {
            subscriber.next(String.fromCodePoint(...input));
            subscriber.complete();
          }
        },
        (err) => subscriber.error(err),
      );
    });
  } else {
    const value = Array.isArray(charCodes[0]) ? (charCodes[0] as number[]) : ([...charCodes] as number[]);
    return new Observable<string>((subscriber: Subscriber<string>): void => {
      subscriber.next(String.fromCodePoint(...value));
      subscriber.complete();
    });
  }
}
