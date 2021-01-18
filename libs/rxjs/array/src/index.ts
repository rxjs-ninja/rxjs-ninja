/**
 * Package containing various operators for filtering, querying and parsing Arrays and Sets in RxJS
 *
 * @packageDocumentation
 * @module Array
 *
 * @ignore
 */
/* istanbul ignore file */
export { binarySearch } from './lib/binary-search';
export { difference } from './lib/difference';
export { filterDifference } from './lib/filter-difference';
export { every } from './lib/every';
export { fill } from './lib/fill';
export { filterEvery } from './lib/filter-every';
export { filterSome } from './lib/filter-some';
export { find } from './lib/find';
export { findAll } from './lib/find-all';
export { findLast } from './lib/find-last';
export { findIndex } from './lib/find-index';
export { flipArray } from './lib/flip-array';
export { mapToArray } from 'libs/rxjs/array/src/lib/map-to-array';
export { objectEntriesToArray } from 'libs/rxjs/array/src/lib/object-entries-to-array';
export { objectKeysToArray } from 'libs/rxjs/array/src/lib/object-keys-to-array';
export { setToArray } from 'libs/rxjs/array/src/lib/set-to-array';
export { indexOf } from './lib/index-of';
export { intersects } from './lib/intersects';
export { filterIntersects } from './lib/filter-intersects';
export { isEqualSet } from './lib/is-equal-set';
export { isSubsetOf } from './lib/is-subset-of';
export { isSupersetOf } from './lib/is-superset-of';
export { join } from './lib/join';
export { lastIndexOf } from './lib/last-index-of';
export { reverse } from './lib/reverse';
export { shuffle } from './lib/shuffle';
export { some } from './lib/some';
export { sort } from './lib/sort';
export { sortMap } from './lib/sort-map';
export { toSet } from './lib/to-set';

export { BinarySearchResult } from './types/binary-search';
export { ArrayOrSet } from './types/array-set';
