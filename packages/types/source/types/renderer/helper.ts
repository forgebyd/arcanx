// biome-ignore-all lint/complexity/noBannedTypes: type def file

import type { ReadonlyDeep, UnknownArray, UnknownRecord } from 'type-fest';
import type { Brand } from '../utilities/helper.js';

/**
 * A branded type representing the name of a template helper.
 * This type is used to ensure that template helper names
 * are unique and easily identifiable within the system.
 *
 * @see {@link TemplateHelperResourceSpec}
 * @see {@link TemplateHelperResourceResolved}
 * @see {@link TemplateHelperResourceManifest}
 *
 * @example
 * ```ts
 * const helperName: TemplateHelperName = 'myHelper' as TemplateHelperName;
 * ```
 *
 * @category Renderer
 */
export type TemplateHelperName = Brand<string, 'TemplateHelperName'>;

/**
 * Specification for a template helper resource.
 * This type defines the structure for specifying a template helper,
 * including an optional name and a delegation function that implements
 * the helper's functionality.
 *
 * @template TContext - The type of the context passed to the helper.
 *
 * @example
 * ```ts
 * const helperResourceSpec: TemplateHelperResourceSpec = {
 *   name: 'myHelper' as TemplateHelperName,
 *   delegation: (context, options) => {
 *     // Helper implementation
 *   },
 * };
 * ```
 *
 * @category Renderer
 */
export type TemplateHelperResourceSpec<TContext = UnknownArray> = {
  name?: string;
  delegation: TemplateHelperDelegate<TContext>;
};

/**
 * Resolved template helper resource.
 * This type represents a fully resolved template helper,
 * including a definitive name and a delegation function.
 * It is used to ensure that the helper is properly identified
 * and can be invoked with the correct context and options.
 *
 * @template TContext - The type of the context passed to the helper.
 *
 * @example
 * ```ts
 * const helperResourceResolved: TemplateHelperResourceResolved = {
 *   name: 'myHelper' as TemplateHelperName,
 *   delegation: (context, options) => {
 *     // Helper implementation
 *   },
 * };
 * ```
 *
 * @category Renderer
 */
export type TemplateHelperResourceResolved<TContext = UnknownArray> = {
  name: TemplateHelperName;
  delegation: TemplateHelperDelegate<TContext>;
};

/**
 * Manifest representation of a template helper resource.
 * This type is a deeply readonly version of the resolved template helper,
 * ensuring that the properties cannot be modified after creation.
 * It is used to maintain the integrity of the helper's definition
 * throughout its lifecycle.
 *
 * @template TContext - The type of the context passed to the helper.
 *
 * @example
 * ```ts
 * const helperResourceManifest: TemplateHelperResourceManifest = {
 *   name: 'myHelper' as TemplateHelperName,
 *   delegation: (context, options) => {
 *     // Helper implementation
 *   },
 * };
 * ```
 *
 * @category Renderer
 */
export type TemplateHelperResourceManifest<TContext = UnknownArray> =
  ReadonlyDeep<TemplateHelperResourceResolved<TContext>>;

/**
 * Delegate function type for a template helper.
 * This function takes a context and options, and returns an unknown value.
 * It is used to define the behavior of a template helper within the rendering system.
 *
 * @template TContext - The type of the context passed to the helper.
 *
 * @see {@link TemplateHelperResourceSpec}
 * @see {@link TemplateHelperResourceResolved}
 * @see {@link TemplateHelperResourceManifest}
 *
 * @example
 * ```ts
 * const helperDelegate: TemplateHelperDelegate = (context, options) => {
 *   // Helper implementation
 *   return 'result';
 * };
 * ```
 *
 * @category Renderer
 */
export type TemplateHelperDelegate<TContext = UnknownArray> = (
  context: TContext,
  options: TemplateHelperOptions
) => unknown;

/**
 * Options passed to a template helper.
 * This type defines the structure of the options object,
 * which includes a hash of named parameters and additional data.
 * It is used to provide context and configuration to the helper during execution.
 *
 * @see https://handlebarsjs.com/api-reference/helpers.html
 * @see https://handlebarsjs.com/guide/#block-helpers
 * @see https://handlebarsjs.com/guide/#custom-helpers
 */
export type TemplateHelperOptions = {
  hash: UnknownRecord;
  data: UnknownRecord;
};
