/**
 * @packageDocumentation
 * @module String
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable array of segment strings from `Intl.Segmenter`.
 *
 * @category Intl
 *
 * @param locales Locales for the segmenter
 * @param options `Intl.Segmenter` options
 *
 * @returns Observable that emits segment strings in order
 */
export function intlSegment(
  locales?: Subscribable<Intl.LocalesArgument> | Intl.LocalesArgument,
  options?: Subscribable<Intl.SegmenterOptions> | Intl.SegmenterOptions,
): OperatorFunction<string, string[]> {
  const locales$ = createOrReturnObservable(locales);
  const options$ = createOrReturnObservable(options);
  return (source) =>
    source.pipe(
      withLatestFrom(locales$, options$),
      map(([value, localeValue, optionValue]) => {
        const segmenter = new Intl.Segmenter(localeValue, optionValue);
        return [...segmenter.segment(value)].map((part) => part.segment);
      }),
    );
}
