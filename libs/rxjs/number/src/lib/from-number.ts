/**
 * @packageDocumentation
 * @module Number
 */
import { isObservable, Observable, ObservableInput, Subscriber } from 'rxjs';
import { isPromise } from 'rxjs/internal-compatibility';

/**
 * Returns an Observable that emits numbers from an an arguments list or array of number values
 *
 * @category Number Observable Generators
 *
 * @remarks This is a type-safe version of the RxJS {@link https://rxjs.dev/api/index/function/from|from} operator that
 *   only accepts numbers as input
 *
 * @param args Numbers to emit from the Observable as arguments or an array
 *
 * @example
 * Returns an observable from a single number and multiply the value
 * ```ts
 * fromNumber(6).pipe(map(val => val * 7)).subscribe();
 * ```
 * Output: `42`
 *
 * @example
 * Returns an Observable from an argument list of numbers and reduce the values
 * ```ts
 * fromNumber(1, 2, 3, 4).pipe(reduce((acc, val) => acc + val)).subscribe();
 * ```
 * Output: `10`
 *
 * @example
 * Returns an Observable from an array of numbers and reduce the values
 * ```ts
 * const input = [1, 2, 3, 4];
 * fromNumber(input).pipe(reduce((acc, val) => acc + val)).subscribe();
 * ```
 * Output: `10`
 *
 * @returns Observable that emits numbers passed from arguments or array
 */
export function fromNumber<T extends ObservableInput<number> | PromiseLike<number> | number | number[]>(
  ...args: T[]
): Observable<number> {
  if (isObservable(args[0])) {
    return (args[0] as never) as Observable<number>;
  } else if (isPromise(args[0])) {
    return new Observable<number>((subscriber: Subscriber<unknown>): void => {
      ((args[0] as never) as Promise<T>).then(
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
    const value = Array.isArray(args[0]) ? (args[0] as number[]) : ([...args] as number[]);

    return new Observable<number>((subscriber: Subscriber<number>): void => {
      for (let i = 0; i < value.length; i++) {
        subscriber.next(value[i]);
      }
      subscriber.complete();
    });
  }
}
