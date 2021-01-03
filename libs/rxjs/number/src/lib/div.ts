/**
 * @packageDocumentation
 * @module Number
 */
import { combineLatest, isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * @private
 * @internal
 */
const ERROR_MESSAGE = `'div' operator cannot divide by 0`;

/**
 * Returns an Observable that emits a number that is the division of the source number with input number
 *
 * @param input The number to divide to the source value
 *
 * @remarks If the input value is `0` this operator will throw an error
 *
 * @example Returns a number that is the division of source and input
 * ```ts
 * const input = [4, 10, 12, 18, 20];
 * from(input).pipe(div(2)).subscribe();
 * ```
 * Output: `2, 5, 6, 9, 10`
 *
 * @returns Observable that emits a number that is the division of source and input
 * @category Number Math
 */
export function div(input: number | ObservableInput<number>): MonoTypeOperatorFunction<number> {
  if (isObservable(input)) {
    return (source: Observable<number>) =>
      combineLatest([source, input]).pipe(
        map(([value, _input]) => {
          if (_input === 0) {
            throw new Error(ERROR_MESSAGE);
          }
          return value / (_input as number);
        }),
      );
  }
  if (input === 0) {
    throw new Error(ERROR_MESSAGE);
  }
  return (source: Observable<number>) => source.pipe(map((value) => value / (input as number)));
}
