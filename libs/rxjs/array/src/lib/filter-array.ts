/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredicateFn } from '../types/generic-methods';
import { matchPredicate } from '../utils/match-predicate';

/**
 * Returns an Observable array containing elements that satisfy the predicate using `Array.prototype.filter`.
 *
 * @category Filter
 *
 * @typeParam T Item type contained in the Array or Set
 *
 * @param predicate Optional [[PredicateFn]]; when omitted, falsy values are removed (except `0` for numbers)
 *
 * @returns An Observable that emits the filtered array
 */
export function filterArray<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<Iterable<T>, T[]> {
  return (source) =>
    source.pipe(map((value) => [...value].filter((item) => matchPredicate(item, predicate))));
}
