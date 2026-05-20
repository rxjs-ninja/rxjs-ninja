/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable `ArrayBuffer` from the `.buffer` property of a TypedArray or DataView source.
 *
 * @category Typed collections
 *
 * @returns An Observable that emits the underlying ArrayBuffer
 */
export function arrayBufferFromTypedArray(): OperatorFunction<ArrayBufferView, ArrayBuffer> {
  return (source) => source.pipe(map((view) => view.buffer as ArrayBuffer));
}
