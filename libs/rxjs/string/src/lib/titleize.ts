/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of } from 'rxjs';
import { split } from './split';
import { map, withLatestFrom } from 'rxjs/operators';
import { ArrayOrSet } from '../types/array-set';

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
 * @category Modify
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
  noTitleWords: ArrayOrSet<string> | ObservableInput<ArrayOrSet<string>> = NO_CAP_WORDS,
  separator: string | ObservableInput<string> = ' ',
  locales?: string | ObservableInput<string>,
): MonoTypeOperatorFunction<string> {
  const noTitleWords$ = (isObservable(noTitleWords) ? noTitleWords : of(noTitleWords)) as Observable<string[]>;
  const separator$ = (isObservable(separator) ? separator : of(separator)) as Observable<string>;
  const locales$ = (isObservable(locales) ? locales : of(locales)) as Observable<string>;

  return (source) =>
    source.pipe(
      split(separator),
      withLatestFrom(noTitleWords$, separator$, locales$),
      map(([values, noTitleInput, separatorInput, localesInput]) =>
        [...values]
          .map((word, index) => {
            if (index && [...noTitleInput].includes(word)) {
              return word;
            }
            return word.charCodeAt(0) >= 65 && word.charCodeAt(0) <= 90
              ? word
              : `${word.charAt(0).toLocaleUpperCase(localesInput)}${word.slice(1)}`;
          })
          .join(separatorInput),
      ),
    );
}
