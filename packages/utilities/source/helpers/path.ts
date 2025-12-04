import nodePath from 'node:path';

import type { AbsolutePath, RelativePath } from '@arcanx/types';

/**
 * Resolves a list of path strings to an absolute path.
 * If any of the paths are absolute, they take precedence over the
 * relative paths. If any of the paths are relative, they are resolved
 * relative to the current working directory.
 *
 * @param targetPaths - The path strings to resolve.
 * @returns An absolute path.
 *
 * @example
 * ```ts
 * const absPath: AbsolutePath = asAbsolutePath("./folder", "file.txt");
 * ```
 *
 * @category Utility.Path
 */
export const asAbsolutePath = (
  ...targetPaths: (string | AbsolutePath | RelativePath)[]
): AbsolutePath => {
  return nodePath.resolve(...targetPaths) as AbsolutePath;
};

/**
 * Resolves a list of path strings to a relative path.
 * If any of the paths are absolute, they take precedence over the
 * relative paths. If any of the paths are relative, they are resolved
 * relative to the provided base path.
 *
 * @param basePath - The base path to resolve the relative paths against.
 * @param targetPaths - The path strings to resolve.
 * @returns A relative path.
 *
 * @example
 * ```ts
 * const relPath: RelativePath = asRelativePath("/usr/local/bin", "./folder", "file.txt");
 * ```
 *
 * @category Utility.Path
 */
export const asRelativePath = (
  basePath: string | AbsolutePath,
  ...targetPaths: (string | AbsolutePath | RelativePath)[]
): RelativePath => {
  return nodePath.relative(
    basePath,
    nodePath.resolve(...targetPaths)
  ) as RelativePath;
};

/**
 * Determines whether a given path string is an absolute path.
 *
 * @param path - The path string to check.
 * @returns true if the path is an absolute path, false otherwise.
 *
 * @example
 * ```ts
 * if (isAbsolutePath("/usr/local/bin")) {
 *   // do something
 * }
 *
 * @category Utility.Path
 */
export const isAbsolutePath = (path: string): path is AbsolutePath => {
  return nodePath.isAbsolute(path);
};

/**
 * Determines whether a given path string is a relative path.
 *
 * @param path - The path string to check.
 * @returns true if the path is a relative path, false otherwise.
 *
 * @example
 * ```ts
 * if (isRelativePath("./folder/file.txt")) {
 *   // do something
 * }
 * ```
 *
 * @category Utility.Path
 */
export const isRelativePath = (path: string): path is RelativePath => {
  return !nodePath.isAbsolute(path);
};
