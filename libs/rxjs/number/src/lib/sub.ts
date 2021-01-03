/**
 * @packageDocumentation
 * @module Number
 */
import { combineLatest, isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number that is the subtraction of the source number with input number
 *
 * @param input The number to subtract to the source value
 *
 * @example Returns a number that is the subtract of source and input
 * ```ts
 * const input = [2, 3, 4, 5, 6];
 * from(input).pipe(sub(3)).subscribe();
 * ```
 * Output: `-1, 0, 1, 2, 3`
 *
 * @returns Observable that emits a number that is the subtraction of source and input
 * @category Number Math
 */
export function sub(input: number | ObservableInput<number>): MonoTypeOperatorFunction<number> {
  if (isObservable(input)) {
    return (source: Observable<number>) =>
      combineLatest([source, input]).pipe(map(([value, _input]) => value - (_input as number)));
  } else {
    return (source: Observable<number>) => source.pipe(map((value) => value - (input as number)));
  }
}
