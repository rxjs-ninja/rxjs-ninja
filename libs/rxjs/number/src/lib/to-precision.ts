/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `toPrecision` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number.
 *
 * The operator will return a string value formatted to the precision value passed
 * [Number.prototype.toPrecision](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision)
 *
 * ![toPrecision Marble Diagram](../assets/marble/number/toPrecision.svg)
 *
 * @param precision The precision value to format the number to
 *
 * @example
 * ```ts
 * from([0.20, 0.36, 1.1])
 * .pipe(
 *    toPrecision(1),
 *    reduce((acc, val) => {
 *      acc.push(val);
 *      return acc;
 *    }, [])
 * ).subscribe(console.log) // ['0.2', '0.4', '1']
 * ```
 *
 * @returns String of the number value formatted using `Number.prototype.toPrecision`
 * @category RxJS Number Formatting
 */
export function toPrecision(precision: number): OperatorFunction<number, string> {
  return (source: Observable<number>) => source.pipe(map((value) => value.toPrecision(precision)));
}
