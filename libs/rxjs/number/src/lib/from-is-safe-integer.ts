/**
 * @packageDocumentation
 * @module number
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `fromIsSafeInteger` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * subscription numbers and returns the value based on it passing a truthy value of
 * [Number.isSafeInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger)
 *
 * @remarks
 * If you just want to check if a number is in the same integer range use the [[isSafeInteger]] operator instead
 *
 * @example
 * ```ts
 * from([1, 2, Math.pow(2, 53), Math.pow(2, 53) - 1]).pipe(fromIsSafeInteger(), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(...) // [1, 2, 9007199254740991]
 * ```
 *
 * @returns The number value that passes the `Number.isSafeInteger` equality check
 * @category RxJS From Number Equality
 */
export function fromIsSafeInteger(): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) => source.pipe(filter((value) => Number.isSafeInteger(value)));
}
