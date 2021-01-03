/**
 * @packageDocumentation
 * @module Number
 */
import { combineLatest, isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number that is the multiplication of the source number with input number
 *
 * @param input The number to multiply to the source value
 *
 * @example Returns a number that is the multiplication of source and input
 * ```ts
 * const input = [2, 3, 4, 5, 6];
 * from(input).pipe(mul(2)).subscribe();
 * ```
 * Output: `4, 6, 8, 10, 12`
 *
 * @returns Observable that emits a number that is the multiplication of source and input
 * @category Number Math
 */
export function mul(input: number | ObservableInput<number>): MonoTypeOperatorFunction<number> {
  if (isObservable(input)) {
    return (source: Observable<number>) =>
      combineLatest([source, input]).pipe(map(([value, _input]) => value * (_input as number)));
  } else {
    return (source: Observable<number>) => source.pipe(map((value) => value * (input as number)));
  }
}
