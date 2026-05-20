/**
 * @packageDocumentation
 * @module Array
 */
import { Subscribable } from 'rxjs';

/**
 * A collection passed to an operator as a static value or Observable. Matches the compare/seed parameter shape used by
 * operators such as [[difference]], [[intersects]], and [[union]].
 *
 * @typeParam T The element type of the iterable collection
 */
export type IterableInput<T> = Subscribable<Iterable<T>> | Iterable<T>;
