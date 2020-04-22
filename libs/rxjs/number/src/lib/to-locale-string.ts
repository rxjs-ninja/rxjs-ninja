import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable number as a locale string
 * @param locales
 * @param format
 */
export function toLocaleString(locales: string | string[], format?: Intl.NumberFormatOptions) {
  return (source: Observable<number>) => source.pipe(map(number => number.toLocaleString(locales, format)));
}
