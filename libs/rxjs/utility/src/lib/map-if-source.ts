/**
 * @packageDocumentation
 * @module utility
 */
import { InputModifierFn, PredicateFn } from '../types/utility';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `ifSource` operator is used with an [Observable](https://rxjs.dev/api/index/class/Observable) value and takes a predicate
 * function. Based on the result of the predicate it will return a value based on a truthy or falsy result. Each value can be
 * cast to a specific type if required
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
 * @returns Any value based on the Truthy or Falsy [[InputModifierFn]] based on the [[FilterPredicateFn]] result
 * @category RxJS Utility Modifier
 */
function mapIfSource<I = never, T = any, F = any>(
  predicate: PredicateFn,
  trueResult: InputModifierFn<I, T>,
  falseResult: InputModifierFn<I, T | F>,
): OperatorFunction<I, T | F> {
  return (source: Observable<never>) =>
    source.pipe(map((value: I) => (predicate(value) ? trueResult(value) : falseResult(value))));
}

export { mapIfSource };
