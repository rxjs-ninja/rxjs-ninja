/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { split } from './split';
import { map } from 'rxjs/operators';

/**
 * Default words to exclude when using the [[titleize]] operator
 */
export const NO_CAP_WORDS = ['a', 'and', 'but', 'is', 'or', 'over', 'the', 'to', 'too'];

/**
 * Return an Observable that emits a string where the source string is titleized (first letter of each word uppercase).
 * The operator uses String.toLocaleUpperCase so can support locale strings
 *
 * By default is uses the [[NO_CAP_WORDS]] to skip some words (unless they are the first word in the string).
 * To disable this pass an empty array, and to extend you can use the default with a spread operator to extend:
 * `[...NO_CAP_WORDS, 'foo', 'bar']`. When using a separator, if no change in default pass `undefined`
 *
 * It will also skip words already starting with a capital (e.g. `RxJS`)
 *
 * @category String Modify
 *
 * @param noTitleWords A list of words to exclude from making a title word
 * @param separator Optional separator to use when joining each word
 * @param locales Locales for string formatting
 *
 * @example
 * Returns a string titilzed with default no caps words
 * ```ts
 * of('the RxJS ninja').pipe(titleize()).subscribe();
 * ```
 * Output: `The RxJS Ninja`
 *
 * @example
 * Returns a string titilzed with additional no cap words
 * ```ts
 * of('the RxJS ninja').pipe(titleize([...NO_CAP_WORDS, 'ninja'])).subscribe();
 * ```
 * Output: `The RxJS ninja`
 *
 * @example
 * Returns a string titilzed with a separator
 * ```ts
 * of('angular,RxJS,typescript,ninja').pipe(titleize(undefined, ',')).subscribe();
 * ```
 * Output: `Angular,RxJS,Typescript,Ninja`
 *
 * @example
 * Returns a string titilzed with a different locale
 * ```ts
 * of('ängulär,RxJS,typescript,ninjä').pipe(titleize(undefined, undefined, 'de-DE')).subscribe();
 * ```
 * Output: `Ängulär,RxJS,Typescript,Ninjä`
 *
 * @returns Observable that emits a titilzed string
 */
export function titleize(
  noTitleWords = NO_CAP_WORDS,
  separator = ' ',
  locales?: string | string[],
): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) =>
    source.pipe(
      split(separator),
      map((values) =>
        values
          .map((word, index) => {
            if (index && noTitleWords.includes(word)) {
              return word;
            }
            return word.charCodeAt(0) >= 65 && word.charCodeAt(0) <= 90
              ? word
              : `${word.charAt(0).toLocaleUpperCase(locales)}${word.slice(1)}`;
          })
          .join(separator),
      ),
    );
}
