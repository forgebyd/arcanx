import type { Timestamp } from '@arcanx/types';

/**
 * Calculates the duration between two timestamps.
 *
 * @param start The starting timestamp.
 * @param end The ending timestamp.
 * @returns The duration between the two timestamps in milliseconds.
 *
 * @example
 * ```ts
 * const start = now();
 * // do something...
 * const end = now();
 *
 * const duration = duration(start, end);
 * ```
 *
 * @category Utility.Time
 */
export const duration = (start: Timestamp, end: Timestamp): number => {
  return end - start;
};

/**
 * Returns the current timestamp in milliseconds.
 *
 * @returns The current timestamp.
 *
 * @example
 * ```ts
 * const timestamp = now();
 * ```
 *
 * @category Utility.Time
 */
export const now = (): Timestamp => {
  return Date.now() as Timestamp;
};
