import type { Brand } from '../utilities/helper.js';

/**
 * Template Engine Types
 *
 * @example
 * ```ts
 * const engineName: TemplateEngineName = 'handlebars' as TemplateEngineName;
 * ```
 *
 * @category Renderer
 */
export type TemplateEngineName = Brand<string, 'TemplateEngineName'>;

/**
 * Template Engine Extension Types
 *
 * @example
 * ```ts
 * const engineExt: TemplateEngineExtension = 'hbs' as TemplateEngineExtension;
 * ```
 *
 * @category Renderer
 */
export type TemplateEngineExtension = Brand<string, 'TemplateEngineExtension'>;

/**
 * Template Engine Configuration Types
 *
 * @example
 * ```ts
 * const engineConfigSpec: TemplateEngineConfigSpec = {
 *   engine: 'handlebars',
 *   extension: 'hbs',
 * };
 * ```
 *
 * @category Renderer
 */
export type TemplateEngineConfigSpec = {
  engine?: 'handlebars' | string;
  extension?: 'hbs' | string;
};

/**
 * Template Engine Resolved Configuration Types
 *
 * @example
 * ```ts
 * const engineConfigResolved: TemplateEngineConfigResolved = {
 *   engine: 'handlebars' as TemplateEngineName,
 *   extension: 'hbs' as TemplateEngineExtension,
 * };
 * ```
 *
 * @category Renderer
 */
export type TemplateEngineConfigResolved = {
  engine: TemplateEngineName;
  extension: TemplateEngineExtension;
};

/**
 * Template Engine Manifest Configuration Types
 *
 * @example
 * ```ts
 * const engineConfigManifest: TemplateEngineConfigManifest = {
 *   engine: 'handlebars' as TemplateEngineName,
 *   extension: 'hbs' as TemplateEngineExtension,
 * } as const;
 * ```
 *
 * @category Renderer
 */
export type TemplateEngineConfigManifest =
  Readonly<TemplateEngineConfigResolved>;
