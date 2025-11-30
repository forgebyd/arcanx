import type { ActionResourceManifest } from '../loader/action.js';
import type { GeneratorResourceManifest } from '../loader/generator.js';
import type { TemplateHelperResourceManifest } from '../renderer/helper.js';
import type { TemplatePartialResourceManifest } from '../renderer/partial.js';
import type { TemplateResourceManifest } from '../renderer/template.js';

/**
 * A resolved context resource.
 * This type is used to ensure type safety when working with context resources.
 *
 * @category Core
 */
export type ContextResourceResolved = {
  customActions: ActionResourceManifest[];
  generators: GeneratorResourceManifest[];
  rendererHelpers: TemplateHelperResourceManifest[];
  rendererPartials: TemplatePartialResourceManifest[];
  templates: TemplateResourceManifest[];
};

/**
 * A manifest representation of a resolved context resource.
 * This type is used to ensure type safety when working with context resources.
 *
 * @category Core
 */
export type ContextResourceManifest = Readonly<ContextResourceResolved>;
