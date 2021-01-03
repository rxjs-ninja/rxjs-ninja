/**
 * @packageDocumentation
 * @module Number
 */
import { combineLatest, isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number that is the remainder of the Modulo operation of the source number
 * by the divider
 *
 * @param modulus The dividing number for the Modulo operation
 *
 * @example Return the remainder of modulus `3`
 * ```ts
 * const input = [2, 3, 4, 5, 6];
 * from(input).pipe(mod(3)).subscribe();
 * ```
 * Output: `2, 0, 1, 2, 6`
 *
 * @returns Observable that emits a number that is reminder of a Modulo operation
 * @category Number Modify
 */
export function mod(modulus: number | ObservableInput<number>): MonoTypeOperatorFunction<number> {
  if (isObservable(modulus)) {
    return (source) => combineLatest([source, modulus]).pipe(map(([value, mod]) => value % (mod as number)));
  } else {
    return (source: Observable<number>) => source.pipe(map((value) => value % (modulus as number)));
  }
}
