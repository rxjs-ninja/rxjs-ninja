import { getRandomValues } from '@trust/webcrypto';
import { observe } from 'rxjs-marbles/jest';
import { reduce, take, tap } from 'rxjs/operators';
import { fromRandomCrypto } from './from-random-crypto';

describe('fromRandomCrypto', () => {
  beforeAll(() => {
    (window as any)['crypto'] = window.crypto || { getRandomValues };
  });

  it(
    'should create an array of random 4-byte numbers by default',
    observe(() => {
      return fromRandomCrypto().pipe(
        take(5),
        reduce<number, number[]>((acc, val) => [...acc, val], []),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'number' && Number.isInteger(v));
          expect(check.length).toBe(5);
        }),
      );
    }),
  );

  it(
    'should create an array of random 1-byte integer',
    observe(() =>
      fromRandomCrypto(0, { bytes: 1 }).pipe(
        take(5),
        reduce<number, number[]>((acc, val) => [...acc, val], []),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'number' && Number.isInteger(v));
          expect(check.length).toBe(5);
        }),
      ),
    ),
  );

  it(
    'should create an array of random 1-byte unsigned integer',
    observe(() =>
      fromRandomCrypto(0, { bytes: 1, unsigned: true }).pipe(
        take(5),
        reduce<number, number[]>((acc, val) => [...acc, val], []),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'number' && Number.isInteger(v));
          expect(check.length).toBe(5);
        }),
      ),
    ),
  );

  it(
    'should create an array of random 2-byte integer',
    observe(() =>
      fromRandomCrypto(0, { bytes: 2 }).pipe(
        take(5),
        reduce<number, number[]>((acc, val) => [...acc, val], []),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'number' && Number.isInteger(v));
          expect(check.length).toBe(5);
        }),
      ),
    ),
  );

  it(
    'should create an array of random 2-byte unsigned integer',
    observe(() =>
      fromRandomCrypto(0, { bytes: 2, unsigned: true }).pipe(
        take(5),
        reduce<number, number[]>((acc, val) => [...acc, val], []),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'number' && Number.isInteger(v));
          expect(check.length).toBe(5);
        }),
      ),
    ),
  );

  it(
    'should create an array of random 4-byte integer',
    observe(() =>
      fromRandomCrypto(0, { bytes: 4 }).pipe(
        take(5),
        reduce<number, number[]>((acc, val) => [...acc, val], []),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'number' && Number.isInteger(v));
          expect(check.length).toBe(5);
        }),
      ),
    ),
  );

  it(
    'should create an array of random 4-byte unsigned integer',
    observe(() =>
      fromRandomCrypto(0, { bytes: 4, unsigned: true }).pipe(
        take(5),
        reduce<number, number[]>((acc, val) => [...acc, val], []),
        tap((value) => {
          const check = value.filter((v) => typeof v === 'number' && Number.isInteger(v));
          expect(check.length).toBe(5);
        }),
      ),
    ),
  );
});
