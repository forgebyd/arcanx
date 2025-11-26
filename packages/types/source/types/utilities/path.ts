import type { Brand } from './helper.js';

/**
 * A branded type representing an absolute file system path.
 * This type is used to ensure type safety when dealing with
 * absolute paths in the codebase.
 *
 * @example
 * let absPath: AbsolutePath = "/usr/local/bin" as AbsolutePath;
 */
export type AbsolutePath = Brand<string, 'AbsolutePath'>;

/**
 * A branded type representing a relative file system path.
 * This type is used to ensure type safety when dealing with
 * relative paths in the codebase.
 *
 * @example
 * let relPath: RelativePath = "./folder/file.txt" as RelativePath;
 */
export type RelativePath = Brand<string, 'RelativePath'>;
