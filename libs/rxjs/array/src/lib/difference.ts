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
 * @typeParam K The type of data if [[InputModifierFn]] converts the type
 *
 * @param input An Array of items use to get the difference between two arrays
 *
 * @example
 * ```ts
 * of(['a', 'b', 'd'])
 *  .pipe(difference(['a', 'c']))
 *  .subscribe(console.log) // ['b', 'd']
 * ```
 *
 * @returns Array of values of difference between the source and input array
 * @category RxJS Array Difference
 */
function difference<T, K>(input: T[]): MonoTypeOperatorFunction<T[]>;
/**
 * @param input An Observable Array of items use to get the difference between two arrays
 *
 * @example
 * ```ts
 * of(['a', 'b', 'd'])
 *  .pipe(difference(of(['a', 'c'])))
 *  .subscribe(console.log) // ['b', 'd']
 * ```
 *
 * @returns Array of values of difference between the source and input array
 * @category RxJS Array Difference
 */
function difference<T, K>(input: ObservableInput<T[]>): MonoTypeOperatorFunction<T[]>;
/**
 * @param input An Observable Array of items use to get the difference between two arrays
 * @param inputModifier A function that provide modification of the values to do the comparision with
 *
 * @example
 * ```ts
 * of(['a', 'b', 'd'])
 *  .pipe(difference(['A', 'C'], (value) => value.toUpperCase()))
 *  .subscribe(console.log) // ['b', 'd']
 * ```
 *
 * @returns Array of values of difference between the source and input array
 * @category RxJS Array Difference
 */
function difference<T, K>(input: T[], inputModifier: InputModifierFn<T, T | K>): MonoTypeOperatorFunction<T[]>;
/**
 * @param input An Observable Array of items use to get the difference between two arrays
 * @param inputModifier A function that provide modification of the values to do the comparision with
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
function difference<T, K>(
  input: ObservableInput<T[]>,
  inputModifier: InputModifierFn<T, T | K>,
): MonoTypeOperatorFunction<T[]>;
function difference<T, K>(
  input: T[] | ObservableInput<T[]>,
  inputModifier?: InputModifierFn<T, T | K>,
): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) =>
    isObservable(input)
      ? input.pipe(switchMap((value) => source.pipe(map(mapDifference(value as T[], inputModifier)))))
      : source.pipe(map(mapDifference(input as T[], inputModifier)));
}

export { difference };
