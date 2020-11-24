/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapFn } from '../types/array-compare';

/**
 * The `lastIndexOf` operator takes an array from a source observable and returns the last index, or array of last index values
 * of passed input, which can be a single value or array of values.
 *
 * Optionally a start index can be passed for the array and a map function to convert the array value for comparison
 * (for example upper/lower case)
 *
 * @param input The value or array of values to check
 * @param fromIndex The index in the array to start the search from
 * @param mapFn Function to modify the value for comparison
 *
 * @returns Array of boolean values flipped from the input
 * @category RxJS Array Query
 */
export function lastIndexOf<T extends unknown>(
  input: T | T[],
  fromIndex?: number,
  mapFn?: MapFn<T>,
): OperatorFunction<T[], number | number[]> {
  return (source) =>
    source.pipe(
      map((value) => {
        fromIndex = fromIndex || value.length - 1;
        return Array.isArray(input)
          ? (input.map((inputVal) =>
              mapFn ? value.map(mapFn).lastIndexOf(inputVal, fromIndex) : value.lastIndexOf(inputVal, fromIndex),
            ) as number[])
          : mapFn
          ? value.map(mapFn).lastIndexOf(input, fromIndex)
          : (value.lastIndexOf(input, fromIndex) as number);
      }),
    );
}
