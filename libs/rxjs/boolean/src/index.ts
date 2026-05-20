/**
 * The RxJS Ninja Boolean module contains operators for working with, and returning boolean values, and for filtering
 * any source with predicate methods to check for both truthy and falsy values.
 *
 * @packageDocumentation
 * @module Boolean
 */
/* istanbul ignore file */

// Combinators
export { and } from './lib/and';
export { nand } from './lib/nand';
export { or } from './lib/or';
export { xor } from './lib/xor';

// Filter
export { filterFalsy } from './lib/filter-falsy';
export { filterTruthy } from './lib/filter-truthy';

// Query
export { booleanEvery } from './lib/boolean-every';
export { booleanNone } from './lib/boolean-none';
export { booleanSome } from './lib/boolean-some';
export { firstFalsy } from './lib/first-falsy';
export { firstTruthy } from './lib/first-truthy';
export { isBoolean } from './lib/is-boolean';
export { isFalsy } from './lib/is-falsy';
export { isTruthy } from './lib/is-truthy';
export { lastFalsy } from './lib/last-falsy';
export { lastTruthy } from './lib/last-truthy';

// Operators
export { flip } from './lib/flip';
export { fromBoolean } from './lib/from-boolean';
export { luhnCheck } from './lib/luhn-check';
export { toBoolean } from './lib/to-boolean';

// Types
export type { PredicateFn } from './types/boolean';
