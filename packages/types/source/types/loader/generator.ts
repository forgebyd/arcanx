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

export type GeneratorResourceName = Brand<string, 'GeneratorName'>;

export type GeneratorResourceSpec = {
  name: string;
  description: string;
  actions: GeneratorActionSpec[];
  prompts: GeneratorPromptSpec[];
};

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

export type GeneratorResourceManifest = Readonly<{
  name: GeneratorResourceName;
  description: string;
  actions: GeneratorActionManifest[];
  prompts: GeneratorPromptManifest[];
  meta: Readonly<GeneratorResourceResolved['meta']>;
}>;
