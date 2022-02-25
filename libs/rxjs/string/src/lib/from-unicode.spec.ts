import { of } from 'rxjs';
import { observe } from 'rxjs-marbles/jest';
import { reduce, tap } from 'rxjs/operators';
import { fromUnicode } from './from-unicode';

describe('fromUnicode', () => {
  it(
    'should create string value from passed unicode string',
    observe(() =>
      fromUnicode('\u0041\u006d\u00e9\u006c\u0069\u0065').pipe(tap((value) => expect(value).toBe('Amélie'))),
    ),
  );

  it(
    'should create string value from passed unicode string',
    observe(() =>
      fromUnicode(of('\u0041\u006d\u00e9\u006c\u0069\u0065')).pipe(tap((value) => expect(value).toBe('Amélie'))),
    ),
  );

  it(
    'should create string value from passed unicode array',
    observe(() =>
      fromUnicode(['\u0041\u006d\u00e9\u006c\u0069\u0065', '\u0041\u006d\u0065\u0301\u006c\u0069\u0065']).pipe(
        reduce<string, string[]>((acc, val) => [...acc, val], []),
        tap((value) => expect(value).toStrictEqual(['Amélie', 'Amélie'])),
      ),
    ),
  );

  it(
    'should create string value from passed unicode array',
    observe(() =>
      fromUnicode(of(['\u0041\u006d\u00e9\u006c\u0069\u0065', '\u0041\u006d\u0065\u0301\u006c\u0069\u0065'])).pipe(
        reduce<string, string[]>((acc, val) => [...acc, val], []),
        tap((value) => expect(value).toStrictEqual(['Amélie', 'Amélie'])),
      ),
    ),
  );
});
