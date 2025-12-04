import type { Brand } from '../utilities/helper.js';
import type { AbsolutePath } from '../utilities/path.js';
import type {
  GeneratorActionManifest,
  GeneratorActionResolved,
  GeneratorActionSpec,
} from './generator-action.js';
import type {
  GeneratorPromptManifest,
  GeneratorPromptResolved,
  GeneratorPromptSpec,
} from './generator-prompt.js';

/**
 * A branded string representing the name of a generator.
 * This type is used to ensure type safety when working with generators.
 *
 * @see {@link GeneratorResourceSpec}
 * @see {@link GeneratorResourceResolved}
 * @see {@link GeneratorResourceManifest}
 *
 * @category Loader.Generator
 */
export type GeneratorResourceName = Brand<string, 'GeneratorName'>;

/**
 * A specification for a generator.
 * This type is used to ensure type safety when working with generators.
 *
 * @category Loader.Generator
 */
export type GeneratorResourceSpec = {
  name: string;
  description: string;
  actions: GeneratorActionSpec[];
  prompts: GeneratorPromptSpec[];
};

/**
 * A resolved representation of a generator.
 * This type is used to ensure type safety when working with generators.
 *
 * @category Loader.Generator
 */
export type GeneratorResourceResolved = {
  name: GeneratorResourceName;
  description: string;
  actions: GeneratorActionResolved[];
  prompts: GeneratorPromptResolved[];
  meta: {
    origin: 'external' | 'internal';
    sourcePath: AbsolutePath;
  };
};

/**
 * A manifest representation of a resolved generator.
 * This type is used to ensure type safety when working with generators.
 *
 * @category Loader.Generator
 */
export type GeneratorResourceManifest = Readonly<{
  name: GeneratorResourceName;
  description: string;
  actions: GeneratorActionManifest[];
  prompts: GeneratorPromptManifest[];
  meta: Readonly<GeneratorResourceResolved['meta']>;
}>;
