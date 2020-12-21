/**
 * @packageDocumentation
 * @module Random
 */

import { FromRandomStringOpts } from '../types/from-random-string';

const allUpperCase: string[] = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const allLowerCase: string[] = [...'abcdefghijklmnopqrstuvwxyz'];
const allSpecialChars: string[] = [...'~!@#$%^&*()_+-=[]{}|;:\'",./<>?'];
const allNumbers: string[] = [...'0123456789'];

/**
 * Creates the seed array
 * @private
 * @internal
 * @param opts
 */
export function createSeedArray(opts: FromRandomStringOpts): string[] {
  let seedArray: string[] = [];
  if (opts.caps) seedArray = [...seedArray, ...allUpperCase];
  if (opts.lower) seedArray = [...seedArray, ...allLowerCase];
  if (opts.number) seedArray = [...seedArray, ...allNumbers];
  if (opts.special) seedArray = [...seedArray, ...allSpecialChars];
  return seedArray;
}

/**
 * The default options for [[fromRandomStr]]
 * @internal
 */
export const RND_STR_DEFAULTS: FromRandomStringOpts = {
  /**
   * By default include all caps letters
   */
  caps: true,
  /**
   * By default include all lower case letters
   */
  lower: true,
  /**
   * By default exclude all numbers
   */
  number: true,
  /**
   * By default exclude all special characters
   */
  special: false,
};
