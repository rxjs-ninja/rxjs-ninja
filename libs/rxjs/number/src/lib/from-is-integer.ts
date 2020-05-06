/**
 * @packageDocumentation
 * @module number
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 *
 * The `fromIsInteger` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * subscription numbers and returns the value based on it passing a truthy value of
 * [Number.isInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)
 *
 * @remarks
 * If you just want to check if a number is an integer [[isInteger]] operator instead
 *
 * @example
 * ```ts
 * from([1, 2, 3.14, '4']).pipe(fromIsInteger(), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(...) // [1, 2]
 * ```
 *
 * @returns The number value that passes the `Number.isInteger` equality check
 * @category RxJS From Number Equality
 */
export function fromIsInteger(): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) => source.pipe(filter((value) => Number.isInteger(value)));
}
