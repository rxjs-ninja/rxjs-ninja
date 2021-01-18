/**
 * @packageDocumentation
 * @module Random
 */

/**
 * Generate a UUIDv4
 * From https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
 *
 * @private
 * @internal
 */
export function uuidv4() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
  );
}
