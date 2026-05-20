/**
 * Package with operators for generating Observables, filtering, querying and parsing strings in RxJS
 *
 * @packageDocumentation
 * @module String
 */
/* istanbul ignore file */

// Conversion
export { coerceString } from './lib/coerce-string';

// Creators
export { fromCharCode } from './lib/from-char-code';
export { fromCodePoint } from './lib/from-code-point';
export { fromString } from './lib/from-string';
export { fromStringRaw } from './lib/from-string-raw';
export { fromUnicode } from './lib/from-unicode';

// Filter
export { filterEndsWith } from './lib/filter-ends-with';
export { filterIncludes } from './lib/filter-includes';
export { filterStartsWith } from './lib/filter-starts-with';

// Intl
export { intlCollatorCompare } from './lib/intl-collator';
export { intlListFormat } from './lib/intl-list-format';
export { intlSegment } from './lib/intl-segmenter';

// Modify
export { asciiLowerCase } from './lib/ascii-lower-case';
export { asciiUpperCase } from './lib/ascii-upper-case';
export { concat } from './lib/concat';
export { normalize } from './lib/normalize';
export { padEnd } from './lib/pad-string';
export { padStart } from './lib/pad-string';
export { repeat } from './lib/repeat';
export { replace } from './lib/replace';
export { replaceAll } from './lib/replace-all';
export { reverse } from './lib/reverse';
export { toLowerCase } from './lib/to-lower-case';
export { toUpperCase } from './lib/to-upper-case';
export { trim } from './lib/trim-string';
export { trimEnd } from './lib/trim-string';
export { trimStart } from './lib/trim-string';

// Operators
export { mapCharCode } from './lib/map-char-code';
export { mapCodePoint } from './lib/map-code-point';
export { titleize, NO_CAP_WORDS } from './lib/titleize';

// Query
export { charAt } from './lib/char-at';
export { charCodeAt } from './lib/char-code-at';
export { codePointAt } from './lib/code-point-at';
export { endsWith } from './lib/ends-with';
export { includes } from './lib/includes';
export { indexOf } from './lib/index-of';
export { join } from './lib/join';
export { lastIndexOf } from './lib/last-index-of';
export { localeCompare } from './lib/locale-compare';
export { match } from './lib/match';
export { matchAll } from './lib/match-all';
export { search } from './lib/search';
export { slice } from './lib/slice';
export { split } from './lib/split';
export { startsWith } from './lib/starts-with';
export { stringAt } from './lib/string-at';
export { substring } from './lib/substring';

// Types
export { FormType } from './types/normalize';
