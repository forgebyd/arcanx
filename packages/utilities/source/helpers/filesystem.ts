import nodeFs from 'node:fs/promises';
import nodePath from 'node:path';

import type {
  IOIsDirExistsDelegate,
  IOIsFileExistsDelegate,
  IOReadFileDelegate,
  IORemoveFileDelegate,
  IOWriteFileDelegate,
} from '@arcanx/types';
import chalk from 'chalk';

import { createErrorFromInstance } from './error.js';

/**
 * Checks if a directory exists at the given path.
 * If the directory does not exist, or if the path is not a directory,
 * this function returns false.
 *
 * @param path - The path to check.
 * @returns True if the directory exists, false otherwise.
 *
 * @example
 * ```ts
 * if (await isDirExists('/path/to/dir')) {
 *   // throw something...
 * }
 * ```
 *
 * @category Utility.Filesystem
 */
export const isDirExists: IOIsDirExistsDelegate = async (path) => {
  try {
    await nodeFs.access(
      path,
      nodeFs.constants.F_OK | nodeFs.constants.R_OK | nodeFs.constants.W_OK
    );

    const stat = await nodeFs.stat(path);

    return stat.isDirectory();
  } catch {
    return false;
  }
};

/**
 * Checks if a file exists at the given path.
 * If the file does not exist, or if the path is not a file,
 * this function returns false.
 *
 * @param path - The path to check.
 * @returns True if the file exists, false otherwise.
 *
 * @example
 * ```ts
 * if (await isFileExists('/path/to/file.txt')) {
 *   // throw something...
 * }
 * ```
 *
 * @category Utility.Filesystem
 */
export const isFileExists: IOIsFileExistsDelegate = async (path) => {
  try {
    await nodeFs.access(
      path,
      nodeFs.constants.F_OK | nodeFs.constants.R_OK | nodeFs.constants.W_OK
    );

    const stat = await nodeFs.stat(path);

    return stat.isFile();
  } catch {
    return false;
  }
};

/**
 * Reads the content of a file at the given path.
 * If the file does not exist, or if the path is not a file,
 * this function throws an error.
 *
 * @param path - The path to the file to read.
 * @param options - An options object to specify the encoding of the file.
 * @returns The content of the file as a string.
 *
 * @example
 * ```ts
 * const content = await readFile('/path/to/file', {
 *   encoding: 'utf-8'
 * });
 * ```
 *
 * @category Utility.Filesystem
 */
export const readFile: IOReadFileDelegate = async (path, options) => {
  try {
    if (!(await isFileExists(path))) {
      throw new Error(
        `File does not exists at '${chalk.bold.underline(path)}'`
      );
    }

    const content = await nodeFs.readFile(
      path,
      options ?? {
        encoding: 'utf-8',
      }
    );

    return content.toString();
  } catch (error) {
    throw createErrorFromInstance(error as Error, {
      suggestions: [
        'Please ensure that the file exists.',
        'Please ensure that the path given is correct.',
      ],
    });
  }
};

/**
 * Removes a file at the given path.
 * If the file does not exist, or if the path is not a file,
 * this function throws an error.
 *
 * @param path - The path to the file to remove.
 * @param options - An options object to specify whether to force remove the file.
 * @returns Nothing, the file is removed.
 *
 * @example
 * ```ts
 * await removeFile('/path/to/file', {
 *   force: true,
 *   recursive: true
 * });
 * ```
 *
 * @category Utility.Filesystem
 */
export const removeFile: IORemoveFileDelegate = async (path, options) => {
  try {
    if (!(await isFileExists(path))) {
      throw new Error(
        [
          `File does not exists at '${chalk.bold.underline(path)}'.`,
          'Or the given path is not a file.',
        ].join('\n')
      );
    }

    await nodeFs.rm(
      path,
      options ?? {
        force: true,
      }
    );
  } catch (error) {
    throw createErrorFromInstance(error as Error, {
      suggestions: [
        'Please ensure that the file exists.',
        'Please ensure that the file is not in use.',
      ],
    });
  }
};

/**
 * Writes data to a file at the given path.
 * If the file does not exist, or if the path is not a file,
 * this function throws an error.
 *
 * @param path - The path to the file to write.
 * @param data - The data to be written to the file.
 * @param options - An options object to specify the encoding of the file.
 * @returns Nothing, the file is written.
 *
 * @example
 * ```ts
 * await writeFile('/path/to/file', 'something to write...', {
 *   encoding: 'utf-8'
 * })
 * ```
 *
 * @category Utility.Filesystem
 */
export const writeFile: IOWriteFileDelegate = async (path, data, options) => {
  try {
    if (!(await isDirExists(path))) {
      await nodeFs.mkdir(nodePath.dirname(path.toString()), {
        recursive: true,
      });
    }

    await nodeFs.writeFile(
      path,
      data,
      options ?? {
        encoding: 'utf-8',
      }
    );
  } catch (error) {
    throw createErrorFromInstance(error as Error, {
      suggestions: [
        'Please ensure that the file exists.',
        'Please ensure that the file is not in use.',
      ],
    });
  }
};
