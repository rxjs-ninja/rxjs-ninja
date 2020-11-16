/**
 * @packageDocumentation
 * @module number
 */
import { Observable } from 'rxjs';
import { subscribeToSingleOrArrayNumber } from '../utils/from-number.utils';

/**
 * The `fromNumber` operator is used to create an [Observable](https://rxjs.dev/api/index/class/Observable) using a number
 * or array of numbers. The Observable can be subscribed to, which will emit one or more numbers.
 *
 * Using `fromNumber` with an array of numbers is functionally similar to the RxSJ
 * [from](https://rxjs.dev/api/index/function/from) operator - each number in the array will emit a value
 * to the subscription
 *
 * @param source The number or array or numbers to start from
 *
 * @example
 * ```ts
 * fromNumber(6)
 *  .pipe(map(val => val * 7))
 *  .subscribe(console.log) // 42
 * ```
 *
 * @example
 * ```ts
 * fromNumber([1, 2, 3])
 *  .pipe(reduce((acc, val) => acc + val))
 *  .subscribe(console.log) // 6
 * ```
 *
 * @returns Observable created from the input array of numbers
 * @category RxJS Number Observables
 */
export function fromNumber(source: number | number[]): Observable<number> {
  return new Observable<number>(subscribeToSingleOrArrayNumber(source));
}
