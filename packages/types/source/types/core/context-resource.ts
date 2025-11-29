import type { GeneratorResourceManifest } from '../loader/generator.js';
import type { TemplateHelperResourceManifest } from '../renderer/helper.js';
import type { TemplatePartialResourceManifest } from '../renderer/partial.js';
import type { TemplateResourceManifest } from '../renderer/template.js';

export type ContextResourceResolved = {
  generators: GeneratorResourceManifest[];
  rendererHelpers: TemplateHelperResourceManifest[];
  rendererPartials: TemplatePartialResourceManifest[];
  templates: TemplateResourceManifest[];
};

export type ContextResourceManifest = Readonly<ContextResourceResolved>;
