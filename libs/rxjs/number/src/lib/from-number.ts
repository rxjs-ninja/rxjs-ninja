/**
 * @packageDocumentation
 * @module Number
 */
import { Observable, Subscriber } from 'rxjs';
import { subscribeToSingleOrArrayNumber } from '../utils/from-number';

/**
 * Returns an Observable that emits numbers from an an arguments list or array of number values
 *
 * @category Number Observable Generators
 *
 * @remarks This is a type-safe version of the RxJS {@link https://rxjs.dev/api/index/function/from|from} operator that only accepts numbers as input
 *
 * @param numbers Numbers to emit from the Observable as arguments or an array
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
export function fromNumber<T extends number | number[]>(...numbers: T[]): Observable<number> {
  const value = Array.isArray(numbers[0]) ? (numbers[0] as number[]) : ([...numbers] as number[]);

  return new Observable<number>((subscriber: Subscriber<number>): void => {
    for (let i = 0; i < value.length; i++) {
      subscriber.next(value[i]);
    }
    subscriber.complete();
  });
}
