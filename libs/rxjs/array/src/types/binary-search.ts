/**
 * @packageDocumentation
 * @module array
 */

/**
 * The return tuple for an Array search result, contains the search value, the search array and the index of the search result
 *
 * @typeParam T Type of array items
 */
export type BinarySearchResult<T = any> = [index: number, searchValue: T, searchArray: T[]]; // eslint-disable-line
