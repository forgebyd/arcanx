import type {
  ErrRegistryDelegate,
  ErrRegistryKey,
  IErrRegistryContract,
} from '@arcanx/types';
import chalk from 'chalk';
import { pascalCase, sentenceCase } from 'change-case';
import _concat from 'lodash.concat';
import _has from 'lodash.has';

import { ERR_NAME, ERR_REGISTRY, type ErrRegistry } from '../consts/error.js';

const formatAll = (segments: (string | boolean)[]): string => {
  return segments.filter(Boolean).join('\n\n');
};

const formatDetails = (
  details: IErrRegistryContract['details']
): string | boolean => {
  if (!details?.length) {
    // return false immediately if there are no details
    // to avoid unnecessary string concatenation
    return false;
  }

  return _concat(
    [chalk.bold('Details')],
    details.map((detail) => {
      return ` ${chalk.magenta('✦')}  ${detail}`;
    })
  ).join('\n');
};

const formatMessages = (messages: IErrRegistryContract['messages']): string => {
  return messages.join('\n');
};

const formatStacks = (stacks?: string): string | boolean => {
  if (!stacks) {
    // return false immediately if there are no stacks
    // to avoid unnecessary string concatenation
    return false;
  }

  return _concat(
    [chalk.bold('Stacks')],
    stacks
      .split('\n')
      .slice(1)
      .map((stack) => {
        const stackInfo = retrieveInfoFromStack(stack);

        if (typeof stackInfo === 'boolean') {
          return false;
        }

        return [
          ` ${chalk.red('✦')}  at ${stackInfo.fn}`,
          `    ${stackInfo.file}:${stackInfo.loc.line}:${stackInfo.loc.column}`,
        ].join('\n');
      })
      .filter(Boolean)
  ).join('\n');
};

const formatSuggestions = (
  suggestions: IErrRegistryContract['suggestions']
): string | boolean => {
  if (!suggestions?.length) {
    // return false immediately if there are no suggestions
    // to avoid unnecessary string concatenation
    return false;
  }

  return _concat(
    [chalk.bold('Suggestions')],
    suggestions.map((suggestion) => {
      return ` ${chalk.blue('✦')}  ${sentenceCase(suggestion)}`;
    })
  ).join('\n');
};

const retrieveContractFromRegistry = <
  TRegistry extends ErrRegistry,
  TKey extends ErrRegistryKey<TRegistry>,
  TArgs extends Parameters<ErrRegistryDelegate<TRegistry, TKey>>,
>(
  registry: TRegistry,
  key: TKey,
  ...args: TArgs
): IErrRegistryContract => {
  if (!_has(registry, key)) {
    throw createErrorFromMessage(
      [
        `Failed to find error registry key: ${chalk.bold.underline(key)}.`,
        'Please make sure the key provided is exist in the error registry.',
      ].join('\n')
    );
  }

  if (typeof registry[key] !== 'function') {
    throw createErrorFromMessage(
      [
        `Given error registry key: ${chalk.bold.underline(key)} is not a function.`,
        'Please make sure the value from the error registry is a function.',
      ].join('\n')
    );
  }

  return (registry[key] as ErrRegistryDelegate<TRegistry, TKey>).apply(
    null,
    args
  );
};

const retrieveInfoFromStack = (
  stack: string
):
  | {
      fn: string;
      file: string;
      loc: {
        line: string;
        column: string;
      };
    }
  | boolean => {
  const matches = stack.trim().match(/^at (.+) \((.+):(\d+):(\d+)\)$/i);

  if (!matches) {
    // return false immediately if the stack does not match the expected format
    // to avoid unnecessary string formatting
    return false;
  }

  return {
    fn: chalk.bold.cyan(matches[1]),
    file: chalk.underline(matches[2]),
    loc: {
      line: chalk.green(Number.parseInt(matches[3], 10)),
      column: chalk.green(Number.parseInt(matches[4], 10)),
    },
  };
};

/**
 * Creates an error instance from an error registry key and its arguments.
 *
 * @template TKey - The key of the error registry.
 * @template TArgs - The arguments of the error registry delegate.
 * @param key - The key of the error registry.
 * @param args - The arguments of the error registry delegate.
 * @returns An error instance created from the error registry key and its arguments.
 *
 * @example
 * ```ts
 * const err = createError('key', 'arg1');
 * const err = createError('key', 'arg1', 'arg2');
 * const err = createError('key', 'arg1', 'arg2', 'arg3');
 * ```
 *
 * @category Utility.Error
 */
export const createError = <
  TKey extends ErrRegistryKey<ErrRegistry>,
  TArgs extends Parameters<ErrRegistryDelegate<ErrRegistry, TKey>>,
>(
  key: TKey,
  ...args: TArgs
): Error => {
  if (typeof key !== 'string') {
    throw createErrorFromMessage(
      [
        `Given key: ${chalk.bold.underline(key)} is not a string.`,
        'Please make sure the key provided is a string.',
      ].join('\n')
    );
  }

  const errContract = retrieveContractFromRegistry(ERR_REGISTRY, key, ...args);
  const errInstance = new Error(errContract.messages.join('\n'));

  errInstance.message = formatAll([
    chalk.bold.underline.red(`${ERR_NAME}: ${pascalCase(key)}`),
    formatMessages(errContract.messages),
    formatDetails(errContract.details),
    formatSuggestions(errContract.suggestions),
    formatStacks(errInstance.stack),
  ]);

  return errInstance;
};

/**
 * Creates a new error instance with the given error instance and options.
 *
 * @param instance - The error instance to be used for creating the new error.
 * @param options - An optional object containing additional details, suggestions, and stack traces.
 * @returns A new error instance created from the given error instance and options.
 *
 * @example
 * ```ts
 * const err = createErrorFromInstance(
 *   new Error('Operation Failed')
 * );
 *
 * const err = createErrorFromInstance(
 *   new Error('Operation Failed'),
 *   {
 *     details: ['Detail #1', 'Detail #2', 'Detail #3'],
 *     suggestions: ['Suggestion #1', 'Suggestion #2', 'Suggestion #3'],
 *   }
 * );
 * ```
 *
 * @category Utility.Error
 */
export const createErrorFromInstance = (
  instance: Error,
  options?: Omit<IErrRegistryContract, 'messages'>
): Error => {
  if (!(instance instanceof Error)) {
    throw createErrorFromMessage(
      [
        `Given instance: ${chalk.bold.underline(typeof instance)} is not an instance of Error.`,
        'Please make sure the instance provided is an instance of Error.',
      ].join('\n')
    );
  }

  instance.message = formatAll([
    chalk.bold.underline.red(`${ERR_NAME}: ${pascalCase(instance.name)}`),
    formatMessages([instance.message]),
    formatDetails(options?.details),
    formatSuggestions(options?.suggestions),
    formatStacks(instance.stack),
  ]);

  return instance;
};

/**
 * Creates a new error instance with the given error message and options.
 *
 * @param message - The error message to be used for creating the new error.
 * @param options - An optional object containing additional details, suggestions, and stack traces.
 * @returns A new error instance created from the given error message and options.
 *
 * @example
 * ```ts
 * const err = createErrorFromMessage(
 *   'Operation Failed'
 * );
 *
 * const err = createErrorFromMessage(
 *   'Operation Failed',
 *   {
 *     details: ['Detail #1', 'Detail #2', 'Detail #3'],
 *     suggestions: ['Suggestion #1', 'Suggestion #2', 'Suggestion #3'],
 *   }
 * );
 * ```
 *
 * @category Utility.Error
 */
export const createErrorFromMessage = (
  message: string,
  options?: Omit<IErrRegistryContract, 'messages'>
): Error => {
  if (typeof message !== 'string') {
    throw createErrorFromMessage(
      [
        'Given message is not a string',
        'Please make sure the message provided is a string.',
      ].join('\n')
    );
  }

  const instance = new Error(message);

  instance.message = formatAll([
    chalk.bold.underline.red(`${ERR_NAME}: ${pascalCase(instance.name)}`),
    formatMessages([instance.message]),
    formatDetails(options?.details),
    formatSuggestions(options?.suggestions),
    formatStacks(instance.stack),
  ]);

  return instance;
};
