/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable `DataView` over an ArrayBuffer.
 *
 * @category Typed collections
 *
 * @param byteOffset Optional byte offset (default `0`)
 * @param length Optional byte length of the view
 *
 * @returns An Observable that emits the DataView
 */
export function dataViewFromArrayBuffer(
  byteOffset: Subscribable<number> | number = 0,
  length?: Subscribable<number> | number,
): OperatorFunction<ArrayBuffer, DataView> {
  const byteOffset$ = createOrReturnObservable(byteOffset);
  if (length === undefined) {
    return (source) =>
      source.pipe(
        withLatestFrom(byteOffset$),
        map(([buffer, offset]) => new DataView(buffer, offset)),
      );
  }
  const length$ = createOrReturnObservable(length);
  return (source) =>
    source.pipe(
      withLatestFrom(byteOffset$, length$),
      map(([buffer, offset, len]) => new DataView(buffer, offset, len)),
    );
}
