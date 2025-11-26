/**
 * A utility type to create branded types for stronger type safety.
 * This helps to distinguish between types that are structurally identical
 * but conceptually different.
 *
 * @template T - The original type to be branded.
 * @template TName - A unique string literal type to identify the brand.
 *
 * @example
 * type UserId = Brand<number, 'UserId'>;
 * type OrderId = Brand<number, 'OrderId'>;
 */
export type Brand<T, TName extends string> = T & {
  __brand: TName;
};
