import type { IErrRegistryContract } from '@arcanx/types';

import chalk from 'chalk';

/**
 * Error Name
 *
 * @category Utility.Error
 */
export const ERR_NAME = 'ArcanxError';

/**
 * Error Registry
 *
 * @category Utility.Error
 */
export const ERR_REGISTRY = {
  'config-not-defined': (): IErrRegistryContract => ({
    messages: [
      'Failed to resolve config file, it was not defined inside the project.',
      'It can be either not defined or incorrectly defined.',
    ],
    suggestions: [
      'Please check if the config file is defined inside the project.',
      'Please check if the config file is correctly defined.',
      'Please refer to the documentation for more information.',
    ],
  }),
  'config-not-found': (path: string): IErrRegistryContract => ({
    messages: [
      'Failed to resolve config file, it was not found on the provided path.',
      'It can be either not created or incorrectly typed.',
      `Provided path ⇒ ${chalk.bold.underline(path)}`,
    ],
    suggestions: [
      'Please check if the config file exists on the provided path.',
      'Please check if the config file is correctly typed.',
      'Please refer to the documentation for more information.',
    ],
  }),
  'config-invalid-format': (
    path: string,
    detail: string
  ): IErrRegistryContract => ({
    messages: [
      'Failed to parse config file, it was not in correct format.',
      'It cannot be formatted with expected formatter.',
      `Provided config at ⇒ ${chalk.bold.underline(path)}`,
    ],
    details: [detail],
    suggestions: [
      'Please check if the config file is in correct extension.',
      'Please refer to the documentation for more information.',
    ],
  }),
  'config-invalid-value': (
    path: string,
    details: string[]
  ): IErrRegistryContract => ({
    messages: [
      'Failed to parse config file, some values are invalid.',
      'Please refer to the details for erroring values.',
      `Provided config at ⇒ ${chalk.bold.underline(path)}`,
    ],
    details,
    suggestions: [
      'Please ensure that the given values are valid.',
      'Please ensure that the required values are present.',
      'Please refer to the documentation for more information.',
    ],
  }),
  // TODO : Add more errors
} as const;

/**
 * Type definition for the error registry.
 *
 * @category Utility.Error
 */
export type ErrRegistry = typeof ERR_REGISTRY;
