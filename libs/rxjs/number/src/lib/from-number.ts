/**
 * @packageDocumentation
 * @module number
 */
import { Observable, SchedulerLike } from 'rxjs';
import { scheduleSingleOrArrayNumber, subscribeToSingleOrArrayNumber } from '../utils/from-number.utils';

/**
 * The `fromNumber` operator is used to create an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number from a passed
 * number value. A single number or array can be passed, if an array is passed each value is emitted
 *
 * @param input Number input to create an Observable<number> from
 * @param scheduler The [SchedulerLike](https://rxjs-dev.firebaseapp.com/api/index/interface/SchedulerLike) to use for scheduling the emission of values, and providing a notion of "time"

 * @example
 * ```ts
 * fromNumber(6 * 7)..subscribe(console.log) // 42
 * ```
 *
 * @example
 * ```ts
 * fromNumber([1, 2, 3])
 *  .pipe(reduce((acc, val) => acc + val))
 *  .subscribe(console.log) // 6
 * ```
 *
 * @remarks
 * Using `fromNumber` with an array of numbers is the same as using the [from](https://rxjs-dev.firebaseapp.com/api/index/function/from) operator from RxJS
 *
 * @returns Observable number from passed input parameter
 * @category RxJS Number Creation
 */
export function fromNumber(input: number | number[], scheduler?: SchedulerLike): Observable<number> {
  if (scheduler) {
    return scheduleSingleOrArrayNumber<number>(input, scheduler);
  }
  return new Observable<number>(subscribeToSingleOrArrayNumber<number>(input));
}
