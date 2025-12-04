import type { Brand, Id, Timestamp } from '../utilities/helper.js';

/**
 * A branded string representing the ID of a context runtime.
 * This type is used to ensure type safety when working with context runtimes.
 *
 * @example
 * ```ts
 * const contextRuntimeId: ContextRuntimeId = 'runtime_123' as ContextRuntimeId;
 * ```
 *
 * @see {@link ContextRuntimeManifest}
 *
 * @category Core.ContextRuntime
 */
export type ContextRuntimeId = Brand<Id<'runtime'>, 'ContextRuntimeId'>;

/**
 * A type representing the manifest of a context runtime.
 * This type is used to ensure type safety when working with context runtimes.
 *
 * @category Core.ContextRuntime
 */
export type ContextRuntimeManifest = Readonly<{
  id: ContextRuntimeId;
  command: string;
  timestamp: Timestamp;
  args: Record<string, unknown>;
}>;
