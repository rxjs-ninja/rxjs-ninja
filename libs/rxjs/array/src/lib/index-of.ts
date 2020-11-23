import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapFn } from '../types/array-compare';

/**
 * The `indexOf` operator takes an array from a source observable and returns the index, or array of index values
 * of passed input, which can be a single value or array of values.
 *
 * Optionally a start index can be passed for the array and a map function to convert the array value for comparison
 * (for example upper/lower case)
 *
 * @param input The value or array of values to check
 * @param fromIndex The index to start from in the array
 * @param mapFn Function to modify the value for comparison
 *
 * @returns Array of boolean values flipped from the input
 * @category RxJS Array Query
 */
export function indexOf<T extends unknown>(
  input: T | T[],
  fromIndex = 0,
  mapFn?: MapFn<T>,
): OperatorFunction<T[], number | number[]> {
  return (source) =>
    source.pipe(
      map((value) =>
        Array.isArray(input)
          ? (input.map((inputVal) =>
              mapFn ? value.map(mapFn).indexOf(inputVal, fromIndex) : value.indexOf(inputVal, fromIndex),
            ) as number[])
          : mapFn
          ? value.map(mapFn).indexOf(input, fromIndex)
          : (value.indexOf(input, fromIndex) as number),
      ),
    );
}
