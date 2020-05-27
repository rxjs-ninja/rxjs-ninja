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
 * @param input Number to initialise the Observable
 * @example
 * ```ts
 * fromNumber(6)
 *  .pipe(map(val => val * 7))
 *  .subscribe(console.log) // 42
 * ```
 *
 * @returns Observable created from the input number
 * @category RxJS Number Observables
 */
function fromNumber(input: number): Observable<number>;
/**
 * Using `fromNumber` with an array of numbers is functionally similar to the RxSJ
 * [from](https://rxjs.dev/api/index/function/from) operator - each number in the array will emit a value
 * to the subscription
 *
 * @param input Array of numbers to initialise the Observable
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
function fromNumber(input: number[]): Observable<number>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromNumber(input: any): Observable<number> {
  return new Observable<number>(subscribeToSingleOrArrayNumber<number>(input));
}

export { fromNumber };
