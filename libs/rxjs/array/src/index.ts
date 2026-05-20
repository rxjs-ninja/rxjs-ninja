/**
 * The RxJS Ninja Array module contains operators for working with, and returning Array values. There are also methods
 * for working with Set, Map and Object converting to and from Array types.
 *
 * @packageDocumentation
 * @module Array
 */
/* istanbul ignore file */

// Operators
export { arrayBufferFromTypedArray } from './lib/array-buffer-from-typed-array';
export { arrayFromTypedArray } from './lib/array-from-typed-array';
export { at } from './lib/at';
export { binarySearch } from './lib/binary-search';
export { concat } from './lib/concat';
export { copyWithin } from './lib/copy-within';
export { dataViewFromArrayBuffer } from './lib/data-view-from-array-buffer';
export { difference } from './lib/difference';
export { differenceAll } from './lib/difference-all';
export { every } from './lib/every';
export { fill } from './lib/fill';
export { filterArray } from './lib/filter-array';
export { filterDifference } from './lib/filter-difference';
export { filterEvery } from './lib/filter-every';
export { filterIntersects } from './lib/filter-intersects';
export { filterSome } from './lib/filter-some';
export { find } from './lib/find';
export { findAll } from './lib/find-all';
export { findIndex } from './lib/find-index';
export { findLast } from './lib/find-last';
export { findLastIndex } from './lib/find-last-index';
export { flat } from './lib/flat';
export { flatMap } from './lib/flat-map';
export { flipArray } from './lib/flip-array';
export { fromArray } from './lib/from-array';
export { fromArrayOf } from './lib/from-array-of';
export { fromMap } from './lib/from-map';
export { fromSet } from './lib/from-set';
export { includes } from './lib/includes';
export { indexOf } from './lib/index-of';
export { intersects } from './lib/intersects';
export { isArray } from './lib/is-array';
export { isDisjointFrom } from './lib/is-disjoint-from';
export { isEqualSet } from './lib/is-equal-set';
export { isSubsetOf } from './lib/is-subset-of';
export { isSupersetOf } from './lib/is-superset-of';
export { join } from './lib/join';
export { lastIndexOf } from './lib/last-index-of';
export { mapArray } from './lib/map-array';
export { mapDelete } from './lib/map-delete';
export { mapGet } from './lib/map-get';
export { mapGroupBy } from './lib/map-group-by';
export { mapHas } from './lib/map-has';
export { mapSet } from './lib/map-set';
export { mapSize } from './lib/map-size';
export { mapToArray } from './lib/map-to-array';
export { objectAssign } from './lib/object-assign';
export { objectEntriesToArray } from './lib/object-entries-to-array';
export { objectGroupBy } from './lib/object-group-by';
export { objectKeysToArray } from './lib/object-keys-to-array';
export { objectMerge } from './lib/object-merge';
export { objectValuesToArray } from './lib/object-values-to-array';
export { reduce } from './lib/reduce';
export { reduceRight } from './lib/reduce-right';
export { reverse } from './lib/reverse';
export { setToArray } from './lib/set-to-array';
export { shuffle } from './lib/shuffle';
export { slice } from './lib/slice';
export { some } from './lib/some';
export { sort } from './lib/sort';
export { sortMap } from './lib/sort-map';
export { symmetricDifference } from './lib/symmetric-difference';
export { toMap } from './lib/to-map';
export { toObject } from './lib/to-object';
export { toReversed } from './lib/to-reversed';
export { toSet } from './lib/to-set';
export { toSorted } from './lib/to-sorted';
export { typedArrayFromArrayBuffer } from './lib/typed-array-from-array-buffer';
export { union } from './lib/union';
export { withIndex } from './lib/with-index';

// Types
export type { ArrayOrSet } from './types/array-set';
export { isArrayOrSet } from './types/array-set';
export type { BinarySearchResult } from './types/binary-search';
export type { GroupByFn } from './types/group-by';
export type { MapFn, PredicateFn, ReduceFn, SortFn } from './types/generic-methods';
export type { IterableInput } from './types/iterable-input';
export type { MapEntry } from './types/map-entry';
export type { ScalarOrList, ScalarOrListInput } from './types/scalar-or-list';
export { isSearchList } from './types/scalar-or-list';
export type { TypedArrayConstructor } from './types/typed-array';
