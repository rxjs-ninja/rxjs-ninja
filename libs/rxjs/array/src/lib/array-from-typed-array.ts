/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable array of numbers copied from a TypedArray source (`Array.from` on the view).
 *
 * @category Typed collections
 *
 * @typeParam T TypedArray element type
 *
 * @returns An Observable that emits a JavaScript array of the typed values
 */
export function arrayFromTypedArray<T extends ArrayBufferView>(): OperatorFunction<T, number[]> {
  return (source) => source.pipe(map((view) => Array.from(view as unknown as ArrayLike<number>)));
}
