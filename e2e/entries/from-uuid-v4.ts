import { firstValueFrom } from 'rxjs';
import { reduce, take, tap } from 'rxjs/operators';
import { fromUUIDv4 } from '../../libs/rxjs/random/src/lib/from-uuid-v4';

export async function uuidLength(): Promise<number> {
  const value = await firstValueFrom(fromUUIDv4().pipe(take(1)));
  return value.length;
}

export async function uuidIntervalTiming(): Promise<number> {
  const start = Date.now();
  await firstValueFrom(
    fromUUIDv4(1000).pipe(
      take(3),
      reduce((a, b) => a + b, ''),
      tap(() => undefined),
    ),
  );
  return Date.now() - start;
}
