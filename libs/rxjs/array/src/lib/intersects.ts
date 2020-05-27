/**
 * @packageDocumentation
 * @module array
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { InputModifierFn } from '../types/array-compare';
import { mapIntersection } from '../utils/intersects';

/**
 * The `intersects` can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) array of values
 * of T, passing in an array or Observable array of values to find the intersection between the two.
 *
 * An optional method can be used to convert values for comparison (see examples)
 *
 * @typeParam T The type of data in the input array
 * @typeParam K The type of data if [[InputModifierFn]] converts the type
 *
 * @param input An Array of items use to get the intersection between two arrays
 *
 * @example
 * ```ts
 * of(['a', 'b', 'd'])
 *  .pipe(intersects(['a', 'c']))
 *  .subscribe(console.log) // ['a']
 * ```
 *
 * @returns Array of values of intersection between the source and input array
 * @category RxJS Array Intersection
 */
function intersects<T, K>(input: T[]): MonoTypeOperatorFunction<T[]>;
/**
 * @param input Observable Array of items use to get the intersection between two arrays
 *
 * @example
 * ```ts
 * of(['a', 'b', 'd'])
 *  .pipe(intersects(of(['a', 'c'])))
 *  .subscribe(console.log) // ['a']
 * ```
 *
 * @returns Array of values of intersection between the source and input array
 * @category RxJS Array Intersection
 */
function intersects<T, K>(input: ObservableInput<T[]>): MonoTypeOperatorFunction<T[]>;
/**
 * @param input Observable Array of items use to get the intersection between two arrays
 * @param inputModifier A function that provide modification of the values to do the comparision with
 *
 * @example
 * ```ts
 * of(['a', 'b', 'd'])
 *  .pipe(intersects(['A', 'C'], (value) => value.toUpperCase()))
 *  .subscribe(console.log) // ['a']
 * ```
 *
 * @returns Array of values of intersection between the source and input array
 * @category RxJS Array Intersection
 */
function intersects<T, K>(input: T[], inputModifier: InputModifierFn<T, T | K>): MonoTypeOperatorFunction<T[]>;
/**
 * @param input Observable Array of items use to get the intersection between two arrays
 * @param inputModifier A function that provide modification of the values to do the comparision with
 *
 * @example
 * ```ts
 * of(['a', 'b', 'd'])
 *  .pipe(intersects(of(['A', 'C']), (value) => value.toUpperCase()))
 *  .subscribe(console.log) // ['a']
 * ```
 *
 * @returns Array of values of intersection between the source and input array
 * @category RxJS Array Intersection
 */
function intersects<T, K>(
  input: ObservableInput<T[]>,
  inputModifier: InputModifierFn<T, T | K>,
): MonoTypeOperatorFunction<T[]>;
function intersects<T, K>(
  input: T[] | ObservableInput<T[]>,
  inputModifier?: InputModifierFn<T, T | K>,
): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) =>
    isObservable(input)
      ? input.pipe(switchMap((value) => source.pipe(map(mapIntersection(value as T[], inputModifier)))))
      : source.pipe(map(mapIntersection(input as T[], inputModifier)));
}

export { intersects };
