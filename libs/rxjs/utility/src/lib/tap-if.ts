/**
 * @packageDocumentation
 * @module utility
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { CallbackFn, PredicateFn } from '../types/utility';
import { switchMap } from 'rxjs/operators';

/**
 * Operator that calls the passed callback when the value of an [Observable](https://rxjs.dev/api/index/class/Observable)
 * provides a truthy value for the passed predicate,
 *
 * @remarks
 * This is similar to the [tap](https://rxjs.dev/api/operators/tap) operator but only executes
 * when the predicate result is truthy
 *
 * @typeParam T The value type of the [Observable](https://rxjs.dev/api/index/class/Observable)
 *
 * @param predicate Function that provides an equality a boolean result for the passed value
 * @param callback The callback to be executed when this operator is run
 *
 * @example
 * ```ts
 * const predicate = (value: string) => value === 'test';
 *
 * of('test')
 * .pipe(tapIf(predicate, (value: string) => console.log(`The value is test`)))
 * .subscribe(console.log) // 'test'
 * ```
 *
 * @returns An [Observable](https://rxjs.dev/api/index/class/Observable) value of T
 * @category RxJS Observable Utilities
 */
function tapIf<T>(predicate: PredicateFn, callback: CallbackFn<T>): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) =>
    source.pipe(
      switchMap((value) => {
        if (predicate(value)) {
          callback(value);
        }
        return source;
      }),
    );
}

export { tapIf };
