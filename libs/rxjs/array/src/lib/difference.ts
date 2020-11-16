/**
 * @packageDocumentation
 * @module array
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { InputModifierFn } from '../types/array-compare';
import { mapDifference } from '../utils/difference';

/**
 * The `difference` can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) array of values
 * of T, passing in an array or Observable array of values to find the difference between the two. The returned array of
 * values only contains values from the source Observable
 *
 * An optional method can be used to convert values for comparison (see examples)
 *
 * @typeParam T The type of data in the input array
 *
 * @param input An Observable Array of items use to get the difference between two arrays
 * @param inputModifier A function that provide modification of the values to do the comparision with
 *
 * @example
 * ```ts
 * of(['a', 'b', 'd'])
 *  .pipe(difference(['a', 'c']))
 *  .subscribe(console.log) // ['b', 'd']
 * ```
 *
 * @example
 * ```ts
 * of(['a', 'b', 'd'])
 *  .pipe(difference(of(['a', 'c'])))
 *  .subscribe(console.log) // ['b', 'd']
 * ```
 *
 * @example
 * ```ts
 * of(['a', 'b', 'd'])
 *  .pipe(difference(['A', 'C'], (value) => value.toUpperCase()))
 *  .subscribe(console.log) // ['b', 'd']
 * ```
 *
 * @example
 * ```ts
 * of(['a', 'b', 'd'])
 *  .pipe(difference(of(['A', 'C'], , (value) => value.toUpperCase())))
 *  .subscribe(console.log) // ['b', 'd']
 * ```
 *
 * @returns Array of values of difference between the source and input array
 * @category RxJS Array Difference
 */
export function difference<T = unknown>(
  input: T[] | ObservableInput<T[]>,
  inputModifier?: InputModifierFn<T, T>,
): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) =>
    isObservable<T[]>(input)
      ? input.pipe(switchMap((value) => source.pipe(map(mapDifference(value, inputModifier)))))
      : source.pipe(map(mapDifference(input as T[], inputModifier)));
}
