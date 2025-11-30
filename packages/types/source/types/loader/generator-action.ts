import type { ReadonlyDeep } from 'type-fest';

import type { Brand } from '../utilities/helper.js';

/**
 * A branded string representing the type of a generator action.
 * This type is used to ensure type safety when working with generator actions.
 *
 * @see {@link GeneratorActionSpec}
 * @see {@link GeneratorActionResolved}
 * @see {@link GeneratorActionManifest}
 *
 * @category Loader
 */
export type GeneratorActionBuiltInType = Brand<
  'add' | 'append' | 'copy' | 'modify' | 'move' | 'remove',
  'GeneratorActionBuiltInType'
>;

/**
 * A branded string representing the type of a custom generator action.
 * This type is used to ensure type safety when working with custom generator actions.
 *
 * @see {@link GeneratorActionSpec}
 * @see {@link GeneratorActionResolved}
 * @see {@link GeneratorActionManifest}
 *
 * @category Loader
 */
export type GeneratorActionCustomType = Brand<
  string,
  'GeneratorActionCustomType'
>;

/**
 * A branded string representing the type of a generator template.
 * This type is used to ensure type safety when working with generator templates.
 *
 * @see {@link GeneratorActionSpec}
 * @see {@link GeneratorActionResolved}
 * @see {@link GeneratorActionManifest}
 *
 * @category Loader
 */
export type GeneratorTemplateType = Brand<
  'file' | 'raw',
  'GeneratorTemplateType'
>;

/**
 * A specification for a generator action.
 * This type is used to ensure type safety when working with generator actions.
 *
 * @category Loader
 */
export type GeneratorActionSpec = {
  type: GeneratorActionBuiltInType | GeneratorActionCustomType;
  destination: string;
  template: {
    type: GeneratorTemplateType;
    sourceOrContent: string;
  };
  abortOnFail?: boolean;
  forceOverwrite?: boolean;
};

/**
 * A resolved representation of a generator action.
 * This type is used to ensure type safety when working with generator actions.
 *
 * @category Loader
 */
export type GeneratorActionResolved = {
  type: GeneratorActionBuiltInType | GeneratorActionCustomType;
  destination: string;
  template: {
    type: GeneratorTemplateType;
    sourceOrContent: string;
  };
  abortOnFail: boolean | undefined;
  forceOverwrite: boolean | undefined;
};

/**
 * A manifest for a generator action.
 * This type is used to ensure type safety when working with generator actions.
 *
 * @category Loader
 */
export type GeneratorActionManifest = ReadonlyDeep<GeneratorActionResolved>;
