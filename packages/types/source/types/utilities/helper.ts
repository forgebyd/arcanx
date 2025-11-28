/**
 * A utility type to create branded types for stronger type safety.
 * This helps to distinguish between types that are structurally identical
 * but conceptually different.
 *
 * @template T - The original type to be branded.
 * @template TName - A unique string literal type to identify the brand.
 *
 * @example
 * ```ts
 * type UserId = Brand<number, 'UserId'>;
 * type OrderId = Brand<number, 'OrderId'>;
 * ```
 *
 * @category Utilities
 */
export type Brand<T, TName extends string> = T & {
  __brand: TName;
};

/**
 * A utility type to create unique identifier types by combining a base name
 * with a unique string. This is useful for generating IDs that are distinct
 * even if they share the same base name.
 *
 * @template TName - A unique string literal type to identify the ID type.
 *
 * @example
 * ```ts
 * type SessionId = Id<'session'>;
 * // Results in a type like 'session_abc123'
 * ```
 *
 * @category Utilities
 */
export type Id<TName extends string> = `${TName}_${string}${string}`;

/**
 * A utility type to represent a branded timestamp.
 * This type ensures that timestamps are treated distinctly
 * from regular numbers in the type system.
 *
 * @example
 * ```ts
 * type CreatedAt = Timestamp;
 * const timestamp: CreatedAt = Date.now() as Timestamp;
 * ```
 *
 * @category Utilities
 */
export type Timestamp = Brand<number, 'Timestamp'>;
