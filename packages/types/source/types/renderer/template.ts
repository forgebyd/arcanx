import type { ReadonlyDeep } from 'type-fest';
import type { Brand } from '../utilities/helper.js';
import type { AbsolutePath, RelativePath } from '../utilities/path.js';

/**
 * A branded string representing the name of a template.
 *
 * @see {@link TemplateResourceSpec}
 * @see {@link TemplateResourceResolved}
 * @see {@link TemplateResourceManifest}
 *
 * @example
 * ```ts
 * const templateName: TemplateName = 'template' as TemplateName;
 * ```
 *
 * @category Renderer
 */
export type TemplateName = Brand<string, 'TemplateName'>;

/**
 * A branded string representing the dot notation name of a template.
 *
 * @see {@link TemplateResourceResolved}
 * @see {@link TemplateResourceManifest}
 *
 * @example
 * ```ts
 * const templateDotName: TemplateDotName = 'template.dot.name' as TemplateDotName;
 * ```
 *
 * @category Renderer
 */
export type TemplateDotName = Brand<string, 'TemplateDotName'>;

/**
 * Specification for a template resource, including its source path.
 *
 * @example
 * ```ts
 * const templateSpec: TemplateResourceSpec = {
 *   sourcePath: './templates/template.hbs',
 * };
 * ```
 *
 * @category Renderer
 */
export type TemplateResourceSpec = {
  sourcePath: string;
};

/**
 * Resolved template resource with detailed information
 * including name, dot name, source paths, and raw content.
 *
 * @example
 * ```ts
 * const templateResolved: TemplateResourceResolved = {
 *   name: 'template' as TemplateName,
 *   dotName: 'template.dot.name' as TemplateDotName,
 *   sourcePath: {
 *     absolute: '/absolute/path/to/template.hbs' as AbsolutePath,
 *     relative: './relative/path/to/template.hbs' as RelativePath,
 *   },
 *   rawContent: '<h1>{{title}}</h1>',
 * };
 * ```
 *
 * @category Renderer
 */
export type TemplateResourceResolved = {
  name: TemplateName;
  dotName: TemplateDotName;
  sourcePath: {
    absolute: AbsolutePath;
    relative: RelativePath;
  };
  rawContent: string;
};

/**
 * Immutable manifest representation of a resolved template resource.
 *
 * @example
 * ```ts
 * const templateManifest: TemplateResourceManifest = {
 *   name: 'template' as TemplateName,
 *   dotName: 'template.dot.name' as TemplateDotName,
 *   sourcePath: {
 *     absolute: '/absolute/path/to/template.hbs' as AbsolutePath,
 *     relative: './relative/path/to/template.hbs' as RelativePath,
 *   },
 *   rawContent: '<h1>{{title}}</h1>',
 * };
 * ```
 *
 * @category Renderer
 */
export type TemplateResourceManifest = ReadonlyDeep<TemplateResourceResolved>;
