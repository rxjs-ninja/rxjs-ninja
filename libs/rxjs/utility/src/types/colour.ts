/**
 * @packageDocumentation
 * @module Utility
 */

/**
 * A Tuple containing `[Red, Green, Blue]` values
 *
 * @typeDef T The type of value contained in the tuple, by default can be a string,
 * but can be changed for numbers
 */
export type RGBTuple<T = string> = [red: T, green: T, blue: T];

export type RGBATuple<T = string> = [red: T, green: T, blue: T, alpha: T];
