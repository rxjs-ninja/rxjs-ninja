import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Operator for taking a string and converting it to all upper case characters.
 *
 * The method uses {@link String.prototype.toLocaleUpperCase|https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase|}
 * to do the conversion, as such this operator accepts an optional locale or locales to convert to
 * @param locales Locales for string conversion
 */
export function toUpperCase<T>(
  locales?: string | string[]
): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) =>
    source.pipe(map(value => value.toLocaleUpperCase(locales)));
}
