/**
 * The response type for an array search
 */
export interface ArraySearchResult<T = unknown> {
  /**
   * The original search value
   */
  searchValue: T;
  /**
   * The array of values searched
   */
  searchArray: T[];
  /**
   * The index of search value in the array
   */
  index: number;
}

export type SearchValue<T> = (value: T) => boolean | T | T[];

export type SortFn<T = unknown> = (a: T, b: T) => number;
