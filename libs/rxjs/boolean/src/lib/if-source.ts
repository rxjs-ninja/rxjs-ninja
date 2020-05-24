/**
 * @packageDocumentation
 * @module boolean
 */
import { PredicateFn } from '../types/boolean';
import { Observable, of, OperatorFunction } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { InputModifierFn } from '../types/iif';

/**
 * The `ifSource` operator is used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) value and takes a predicate
 * function. Based on the result of the predicate it will return an Observable value of the truthy or falsy result
 *
 * @typeParam I The Input Type
 * @typeParam T The type returned from the Truthy result
 * @typeParam F The type returned from the Falsy result
 *
 * @param predicate
 * @param trueResult
 * @param falseResult
 *
 * @example
 * ```ts
 * of('42')
 * .pipe(
 *  ifSource<string, number, string>(
 *    (value) => value === '42',
 *    (value) => parseInt(value),
 *    (value) => `${value}: This is not the ultimate answer`,
 *  ),
 * ).subscribe(console.log) // 42
 * ```
 *
 * @returns Any value based on the Truthy or Falsy [[InputModifierFn]] based on the [[PredicateFn]] result
 * @category RxJS Boolean Modifier
 */
function ifSource<I = never, T = never, F = never>(
  predicate: PredicateFn<I>,
  trueResult: InputModifierFn<I, T>,
  falseResult: InputModifierFn<I, F>,
): OperatorFunction<I, T | F> {
  return (source: Observable<never>) =>
    source.pipe(switchMap((value: I) => (predicate(value) ? of(trueResult(value)) : of(falseResult(value)))));
}

export { ifSource };
