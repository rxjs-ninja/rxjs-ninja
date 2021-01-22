/**
 * @packageDocumentation
 * @module Utility
 */

import { RGBATuple } from '../types/colour';

/**
 * Takes an input string of rgba(num, num, num, num) and converts it to a hex
 * @param input The input RGBA
 * @private
 * @internal
 * @returns A tuple containing the
 */
export function convertRGBAStrToHexComponents(input: string): RGBATuple {
  const values = input.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
  if (!values) {
    throw new Error('No valid RGBA value to parse');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, red, green, blue, alpha] = values;

  const alphaNum = Math.round((Math.round(Number(alpha ? alpha.trim() : 0o1) * 100) / 100) * 255);
  const hexAlpha = (alphaNum + 0x10000).toString(16).substr(-2);
  return [
    (Number(red) | (1 << 8)).toString(16).slice(1),
    (Number(green) | (1 << 8)).toString(16).slice(1),
    (Number(blue) | (1 << 8)).toString(16).slice(1),
    hexAlpha,
  ];
}

/**
 * @private
 * @internal
 * @param hex
 */
const isValidHex = (hex: string) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);

/**
 * @private
 * @internal
 * @param st
 * @param chunkSize
 */
const getChunksFromString = (st: string, chunkSize: number) => st.match(new RegExp(`.{${chunkSize}}`, 'g'));

/**
 * @private
 * @internal
 * @param hexStr
 */
const convertHexUnitTo256 = (hexStr: string) => parseInt(hexStr.repeat(2 / hexStr.length), 16);

/**
 * @private
 * @internal
 */
const getAlphafloat = (a?: number, alpha?: number): number => {
  if (typeof a !== 'undefined') {
    return a / 255;
  }
  return alpha && alpha >= 0 && alpha <= 1 ? alpha : 1;
};

/**
 * @private
 * @internal
 * @param hex
 * @param alpha
 */
export function convertHexToRGBA(hex: string, alpha?: number): string {
  if (!isValidHex(hex)) {
    throw new Error('Invalid HEX');
  }
  const chunkSize = Math.floor((hex.length - 1) / 3);
  const hexArr = getChunksFromString(hex.slice(1), chunkSize);
  /* istanbul ignore next-line */
  if (!hexArr) {
    throw new Error('No chunks from hex string');
  }
  const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
  if (typeof a === 'undefined' && typeof alpha === 'undefined') {
    return `rgb(${r}, ${g}, ${b})`;
  }
  const roundedFloat = Math.round((getAlphafloat(a, alpha) + Number.EPSILON) * 100) / 100;
  return `rgba(${r}, ${g}, ${b}, ${roundedFloat})`;
}
