/**
 * @packageDocumentation
 * @module Number
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number that is the remainder of the Modulo operation of the source number
 * by the divider
 *
 * @category Math
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
 */
export function mod(modulus: number | ObservableInput<number>): MonoTypeOperatorFunction<number> {
  const mod$ = (isObservable(modulus) ? modulus : of(modulus)) as Observable<number>;
  return (source) =>
    source.pipe(
      withLatestFrom(mod$),
      map(([value, inputValue]) => value % inputValue),
    );
}
