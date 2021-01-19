/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, Observable, ObservableInput, Subscribable, throwError } from 'rxjs';
import { catchError, finalize, map, takeWhile, tap } from 'rxjs/operators';
import { fromPromise, isPromise } from 'rxjs/internal-compatibility';
import { flatMapMap, flatMapSet } from '../utils/array-set';
import { createOrReturnObservable } from 'libs/rxjs/string/src/utils/internal';

/**
 * Returns an Observable that emits an `Array` from a `Set`
 *
 * @category Set
 *
 * @typeParam T The type of value contained in the `Set`
 *
 * @param input Input to create the emit values from, can be argument list of `Set`, an array of `Set` or an Observable
 *   or Promise source
 *
 * @example
 * Create `Array` from `Set`
 * ```ts
 * const input = new Set(1, 1, 2, 2, 3, 3, 4, 4);
 * fromSet(input).subscribe();
 * ```
 * Output: `[1, 2, 3, 4]`
 *
 * @returns Observable that emits an `Array` from the input `Set`
 */
export function fromSet<T extends unknown>(
  input: Subscribable<Iterable<Set<T>> | Set<T>> | Iterable<Set<T>> | Set<T>,
): Observable<T[]> {
  return new Observable<T[]>((subscriber) => {
    createOrReturnObservable(input)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map<Iterable<Set<T>> | Set<T>, T[][]>((value) => flatMapSet(value)),
        tap((value) => {
          for (let i = 0; i < value.length; i++) {
            subscriber.next(value[i] as T[]);
          }
        }),
        finalize(() => !subscriber.closed && subscriber.complete()),
      )
      .subscribe();

    /* istanbul ignore next-line */
    return () => !subscriber.closed && subscriber.complete();
  });
}
// export function fromSet<T extends unknown>(
//   ...args: (ObservableInput<Set<T>[] | Set<T>> | Set<T>[] | Set<T>)[]
// ): Observable<T[]> {
//   return new Observable<T[]>((subscriber) => {
//     if (isObservable(args[0])) {
//       (args[0] as Observable<Set<T>[] | Set<T>>)
//         .pipe(
//           takeWhile(() => !subscriber.closed),
//           map<Set<T>[] | Set<T>, T[][]>((value) => flatMapSet(value)),
//           tap((value) => {
//             for (let i = 0; i < value.length; i++) {
//               subscriber.next(value[i]);
//             }
//             !subscriber.closed && subscriber.complete();
//           }),
//         )
//         .subscribe();
//     } else if (isPromise(args[0])) {
//       fromPromise(args[0] as Promise<Set<T>[] | Set<T>>)
//         .pipe(
//           map<Set<T>[] | Set<T>, T[][]>((value) => flatMapSet(value)),
//           tap((value) => {
//             for (let i = 0; i < value.length; i++) {
//               subscriber.next(value[i]);
//             }
//           }),
//           catchError((error) => {
//             subscriber.error(error);
//             return throwError(error);
//           }),
//           finalize(() => !subscriber.closed && subscriber.complete()),
//         )
//         .subscribe();
//     } else {
//       const value = Array.isArray(args[0]) ? flatMapSet(args[0]) : flatMapSet([...(args as Set<T>[])]);
//       for (let i = 0; i < value.length; i++) {
//         subscriber.next(value[i]);
//       }
//       !subscriber.closed && subscriber.complete();
//     }
//     /* istanbul ignore next-line */
//     return () => !subscriber.closed && subscriber.complete();
//   });
// }
