/**
 * @packageDocumentation
 * @module array
 */
/**
 * Internal basic sort method
 * @param a
 * @param b
 */
// eslint-disable-next-line
export function defaultSortFn(a: any, b: any): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}
