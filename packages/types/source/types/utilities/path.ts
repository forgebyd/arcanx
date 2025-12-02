import type { Brand } from './helper.js';

/**
 * A branded type representing an absolute file system path.
 * This type is used to ensure type safety when dealing with
 * absolute paths in the codebase.
 *
 * @example
 * ```ts
 * let absPath: AbsolutePath = "/usr/local/bin" as AbsolutePath;
 * ```
 *
 * @category Utility.Path
 */
export type AbsolutePath = Brand<string, 'AbsolutePath'>;

/**
 * A branded type representing a relative file system path.
 * This type is used to ensure type safety when dealing with
 * relative paths in the codebase.
 *
 * @example
 * ```ts
 * let relPath: RelativePath = "./folder/file.txt" as RelativePath;
 * ```
 *
 * @category Utility.Path
 */
export type RelativePath = Brand<string, 'RelativePath'>;
