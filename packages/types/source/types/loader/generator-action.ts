import type { ReadonlyDeep } from 'type-fest';

import type { Brand } from '../utilities/helper.js';

export type GeneratorActionBuiltInType = Brand<
  'add' | 'append' | 'copy' | 'modify' | 'move' | 'remove',
  'GeneratorActionBuiltInType'
>;

export type GeneratorActionCustomType = Brand<
  string,
  'GeneratorActionCustomType'
>;

export type GeneratorTemplateType = Brand<
  'file' | 'raw',
  'GeneratorTemplateType'
>;

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

export type GeneratorActionManifest = ReadonlyDeep<GeneratorActionResolved>;
