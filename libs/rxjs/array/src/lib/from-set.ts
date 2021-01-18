/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, Observable, ObservableInput, Subscriber } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { isPromise } from 'rxjs/internal-compatibility';

/**
 * Returns an Observable that emits an `Array` from a `Set`, it does not flatten or emit the
 * values from the `Set`, but coverts to `Array`
 *
 * @category Set
 *
 * @typeParam T Type of the value from the source Observable
 *
 * @param args Input values to create the Observable source from
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
  ...args: (ObservableInput<Set<T>[] | Set<T>> | Set<T>[] | Set<T>)[]
): Observable<T[]> {
  if (isObservable(args[0])) {
    return ((args[0] as unknown) as Observable<Set<T>[] | Set<T>>).pipe(
      map<Set<T>[] | Set<T>, T[][]>((value) =>
        Array.isArray(value) ? ([...value.map((set) => [...set])] as T[][]) : ([[...value]] as T[][]),
      ),
      switchMap((value) => {
        return new Observable<T[]>((subscriber: Subscriber<T[]>): void => {
          for (let i = 0; i < value.length; i++) {
            subscriber.next(value[i]);
          }
          subscriber.complete();
        });
      }),
    );
  } else if (isPromise(args[0])) {
    return new Observable<T[]>((subscriber: Subscriber<T[]>): void => {
      ((args[0] as unknown) as Promise<Set<T>>).then(
        (response) => {
          /* istanbul ignore next-line */
          if (!subscriber.closed) {
            subscriber.next([...response]);
            subscriber.complete();
          }
        },
        (err) => subscriber.error(err),
      );
    });
  } else {
    const value = Array.isArray(args[0]) ? (args[0] as Set<T>[]) : ([...args] as Set<T>[]);
    return new Observable<T[]>((subscriber: Subscriber<T[]>): void => {
      for (let i = 0; i < value.length; i++) {
        subscriber.next([...value[i]]);
      }
      subscriber.complete();
    });
  }
}
