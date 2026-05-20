/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';
import { TypedArrayConstructor } from '../types/typed-array';

/**
 * Returns an Observable TypedArray or DataView view over an ArrayBuffer using the given constructor.
 *
 * @category Typed collections
 *
 * @typeParam T TypedArray or DataView type to construct
 *
 * @param ctor Constructor (e.g. `Uint8Array`, `DataView`)
 * @param byteOffset Optional byte offset into the buffer
 * @param length Optional element length for the view
 *
 * @returns An Observable that emits the typed view
 */
export function typedArrayFromArrayBuffer<T extends ArrayBufferView>(
  ctor: TypedArrayConstructor<T>,
  byteOffset: Subscribable<number> | number = 0,
  length?: Subscribable<number> | number,
): OperatorFunction<ArrayBuffer, T> {
  const byteOffset$ = createOrReturnObservable(byteOffset);
  if (length === undefined) {
    return (source) =>
      source.pipe(
        withLatestFrom(byteOffset$),
        map(([buffer, offset]) => new ctor(buffer, offset)),
      );
  }
  const length$ = createOrReturnObservable(length);
  return (source) =>
    source.pipe(
      withLatestFrom(byteOffset$, length$),
      map(([buffer, offset, len]) => new ctor(buffer, offset, len)),
    );
}
