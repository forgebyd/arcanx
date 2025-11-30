import type { Promisable, ReadonlyDeep, UnknownRecord } from 'type-fest';

import type { ContextIOManifest } from '../core/context-io.js';
import type {
  GeneratorActionCustomType,
  GeneratorActionManifest,
} from './generator-action.js';

/**
 * A delegate function for generating an action.
 * This type is used to ensure type safety when working with actions.
 *
 * @see {@link ActionResourceSpec}
 * @see {@link ActionResourceResolved}
 * @see {@link ActionResourceManifest}
 *
 * @category Loader
 */
export type ActionDelegate = Promisable<
  (
    data: UnknownRecord,
    config: Omit<GeneratorActionManifest, 'type'>,
    io: ContextIOManifest
  ) => string
>;

/**
 * A specification for an action.
 * This type is used to ensure type safety when working with actions.
 *
 * @category Loader
 */
export type ActionResourceSpec = {
  name?: string;
  delegate: ActionDelegate;
};

/**
 * A resolved representation of an action.
 * This type is used to ensure type safety when working with actions.
 *
 * @category Loader
 */
export type ActionResourceResolved = {
  name: GeneratorActionCustomType;
  delegate: ActionDelegate;
  meta: {
    origin: 'external' | 'internal';
    sourcePath: string;
  };
};

/**
 * A manifest for an action.
 * This type is used to ensure type safety when working with actions.
 *
 * @category Loader
 */
export type ActionResourceManifest = ReadonlyDeep<ActionResourceResolved>;
