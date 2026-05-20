import { firstValueFrom } from 'rxjs';
import { reduce, take } from 'rxjs/operators';
import { fromRandomCrypto } from '../../libs/rxjs/random/src/lib/from-random-crypto';

async function collectIntegers(bytes: number, unsigned?: boolean): Promise<number> {
  const values = await firstValueFrom(
    fromRandomCrypto(0, { bytes, unsigned }).pipe(
      take(5),
      reduce<number, number[]>((acc, val) => [...acc, val], []),
    ),
  );
  return values.filter((v) => typeof v === 'number' && Number.isInteger(v)).length;
}

export async function defaultBytes(): Promise<number> {
  const values = await firstValueFrom(
    fromRandomCrypto().pipe(
      take(5),
      reduce<number, number[]>((acc, val) => [...acc, val], []),
    ),
  );
  return values.filter((v) => typeof v === 'number' && Number.isInteger(v)).length;
}

export function oneByteInt(): Promise<number> {
  return collectIntegers(1);
}

export function oneByteUnsigned(): Promise<number> {
  return collectIntegers(1, true);
}

export function twoByteInt(): Promise<number> {
  return collectIntegers(2);
}

export function twoByteUnsigned(): Promise<number> {
  return collectIntegers(2, true);
}

export function fourByteInt(): Promise<number> {
  return collectIntegers(4);
}

export function fourByteUnsigned(): Promise<number> {
  return collectIntegers(4, true);
}
