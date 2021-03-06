/**
 * Package with operators for generating Observables, filtering, querying and parsing strings in RxJS
 *
 * @packageDocumentation
 * @module String
 *
 */
/* istanbul ignore file */
export { charAt } from './lib/char-at';
export { charCodeAt } from './lib/char-code-at';
export { codePointAt } from './lib/code-point-at';
export { concat } from './lib/concat';
export { endsWith } from './lib/ends-with';
export { filterEndsWith } from './lib/filter-ends-with';
export { filterIncludes } from './lib/filter-includes';
export { filterStartsWith } from './lib/filter-starts-with';
export { fromCharCode } from './lib/from-char-code';
export { fromCodePoint } from './lib/from-code-point';
export { fromString } from './lib/from-string';
export { fromUnicode } from './lib/from-unicode';
export { includes } from './lib/includes';
export { indexOf } from './lib/index-of';
export { join } from './lib/join';
export { lastIndexOf } from './lib/last-index-of';
export { mapCharCode } from './lib/map-char-code';
export { mapCodePoint } from './lib/map-code-point';
export { match } from './lib/match';
export { matchAll } from './lib/match-all';
export { normalize } from './lib/normalize';
export { padEnd, padStart, padStart as padLeft, padEnd as padRight } from './lib/pad-string';
export { repeat } from './lib/repeat';
export { replace } from './lib/replace';
export { replaceAll } from './lib/replace-all';
export { reverse } from './lib/reverse';
export { search } from './lib/search';
export { slice } from './lib/slice';
export { split } from './lib/split';
export { startsWith } from './lib/starts-with';
export { substring } from './lib/substring';
export { titleize, NO_CAP_WORDS } from './lib/titleize';
export { toLowerCase } from './lib/to-lower-case';
export { toUpperCase } from './lib/to-upper-case';
export { trim, trimStart, trimEnd, trimStart as trimLeft, trimEnd as trimRight } from './lib/trim-string';

export { FormType } from './types/normalize';
