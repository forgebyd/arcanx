import nodeCrypto from 'node:crypto';

import type { Id } from '@arcanx/types';

import {
  camelCase,
  constantCase,
  dotCase,
  kebabCase,
  snakeCase,
  trainCase,
} from 'change-case';

/**
 * Creates a unique identifier string based on the given prefix.
 * The generated ID string is in the format of "{prefix}_{uuid}",
 * where {prefix} is the given string prefix and {uuid} is a randomly
 * generated UUID.
 *
 * @template TPrefix - The prefix string used to generate the unique ID.
 * @param prefix - The prefix string used to generate the unique ID.
 *
 * @returns A unique identifier string based on the given prefix.
 *
 * @example
 * ```ts
 * const id = createId('arcanx');
 * // Results in a string like 'arcanx_123e4567-e89b-12d3-a456-426655440000'
 * ```
 *
 * @category Utility.String
 */
export const createId = <TPrefix extends string>(
  prefix: TPrefix
): Id<TPrefix> => {
  return `${prefix}_${nodeCrypto.randomUUID()}` as Id<TPrefix>;
};

/**
 * Converts a given string to camelCase.
 *
 * @param str - The input string.
 * @returns The converted string in camelCase.
 *
 * @example
 * ```ts
 * toCamelCase('hello world');
 * // => 'helloWorld'
 * ```
 *
 * @category Utility.String
 */
export const toCamelCase = (str: string): string => {
  return camelCase(str);
};

/**
 * Converts a given string to constantCase.
 *
 * @param str - The input string.
 * @returns The converted string in constantCase.
 *
 * @example
 * ```ts
 * toConstantCase('hello world');
 * // => 'HELLO_WORLD'
 * ```
 *
 * @category Utility.String
 */
export const toConstantCase = (str: string): string => {
  return constantCase(str);
};

/**
 * Converts a given string to dotCase.
 *
 * @param str - The input string.
 * @returns The converted string in dotCase.
 *
 * @example
 * ```ts
 * toDotCase('hello world');
 * // => 'hello.world'
 * ```
 *
 * @category Utility.String
 */
export const toDotCase = (str: string): string => {
  return dotCase(str);
};

/**
 * Converts a given string to kebabCase.
 *
 * @param str - The input string.
 * @returns The converted string in kebabCase.
 *
 * @example
 * ```ts
 * toKebabCase('hello world');
 * // => 'hello-world'
 * ```
 *
 * @category Utility.String
 */
export const toKebabCase = (str: string): string => {
  return kebabCase(str);
};

/**
 * Converts a given string to lowercase.
 *
 * @param str - The input string.
 * @returns The converted string in lowercase.
 *
 * @example
 * ```ts
 * toLowerCase('HELLO WORLD');
 * // => 'hello world'
 * ```
 *
 * @category Utility.String
 */
export const toLowerCase = (str: string): string => {
  return str.toLowerCase();
};

/**
 * Converts a given string to snake_case.
 *
 * @param str - The input string.
 * @returns The converted string in snake_case.
 *
 * @example
 * ```ts
 * toSnakeCase('hello world');
 * // => 'hello_world'
 * ```
 *
 * @category Utility.String
 */
export const toSnakeCase = (str: string): string => {
  return snakeCase(str);
};

/**
 * Converts a given string to train-case.
 *
 * @param str - The input string.
 * @returns The converted string in train-case.
 *
 * @example
 * ```ts
 * toTrainCase('hello world');
 * // => 'Hello-World'
 * ```
 *
 * @category Utility.String
 */
export const toTrainCase = (str: string): string => {
  return trainCase(str);
};

/**
 * Converts a given string to uppercase.
 *
 * @param str - The input string.
 * @returns The converted string in uppercase.
 *
 * @example
 * ```ts
 * toUpperCase('hello world');
 * // => 'HELLO WORLD'
 * ```
 *
 * @category Utility.String
 */
export const toUpperCase = (str: string): string => {
  return str.toUpperCase();
};
