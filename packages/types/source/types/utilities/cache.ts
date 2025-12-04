import type { Brand } from './helper.js';

/**
 * A branded type representing Cache Time-To-Live (TTL) in milliseconds.
 * This type ensures that TTL values are explicitly marked, enhancing type safety
 * when dealing with cache expiration settings.
 *
 * @example
 * ```ts
 * const ttl: CacheTTL = 60000 as CacheTTL; // 60 seconds
 * ```
 *
 * @category Utility.Cache
 */
export type CacheTTL = Brand<number, 'CacheTTL'>;
