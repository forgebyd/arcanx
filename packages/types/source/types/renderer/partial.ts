// biome-ignore-all lint/complexity/noBannedTypes: type def file

import type { ReadonlyDeep, UnknownRecord } from 'type-fest';
import type { Brand } from '../utilities/helper.js';
import type { AbsolutePath } from '../utilities/path.js';

/**
 * A branded type representing the name of a template partial.
 * This ensures type safety when working with template partial names.
 *
 * @see {@link TemplatePartialResourceSpec}
 * @see {@link TemplatePartialResourceResolved}
 * @see {@link TemplatePartialResourceManifest}
 *
 * @example
 * ```ts
 * const partialName: TemplatePartialName = 'header' as TemplatePartialName;
 * ```
 *
 * @category Renderer.Partial
 */
export type TemplatePartialName = Brand<string, 'TemplatePartialName'>;

/**
 * Specification for a template partial resource.
 * Includes an optional name and a delegate function to render the partial.
 *
 * @template TContext - The context type for the template partial.
 *
 * @example
 * ```ts
 * const partialSpec: TemplatePartialResourceSpec<MyContextType> = {
 *   name: 'header' as TemplatePartialName,
 *   delegate: (context, options) => {
 *     // rendering logic here
 *     return '<header>...</header>';
 *   },
 * };
 * ```
 *
 * @category Renderer.Partial
 */
export type TemplatePartialResourceSpec<TContext = UnknownRecord> = {
  name?: string;
  delegate: TemplatePartialDelegate<TContext>;
};

/**
 * Resolved template partial resource.
 * Ensures the name is of type `TemplatePartialName`
 * and includes the delegate function.
 *
 * @template TContext - The context type for the template partial.
 *
 * @example
 * ```ts
 * const resolvedPartial: TemplatePartialResourceResolved<MyContextType> = {
 *   name: 'header' as TemplatePartialName,
 *   delegate: (context, options) => {
 *     // rendering logic here
 *     return '<header>...</header>';
 *   },
 * };
 * ```
 *
 * @category Renderer.Partial
 */
export type TemplatePartialResourceResolved<TContext = UnknownRecord> = {
  name: TemplatePartialName;
  delegate: TemplatePartialDelegate<TContext>;
  meta: {
    origin: 'external' | 'internal';
    sourcePath: AbsolutePath;
  };
};

/**
 * Manifest representation of a template partial resource.
 * This is a deeply readonly version of the resolved template partial resource.
 *
 * @template TContext - The context type for the template partial.
 *
 * @example
 * ```ts
 * const manifestPartial: TemplatePartialResourceManifest<MyContextType> = {
 *   name: 'header' as TemplatePartialName,
 *   delegate: (context, options) => {
 *     // rendering logic here
 *     return '<header>...</header>';
 *   },
 * };
 * ```
 *
 * @category Renderer.Partial
 */
export type TemplatePartialResourceManifest<TContext = UnknownRecord> =
  ReadonlyDeep<TemplatePartialResourceResolved<TContext>>;

/**
 * Delegate function type for rendering a template partial.
 * Takes a context and runtime options, returns a rendered string.
 *
 * @template TContext - The context type for the template partial.
 *
 * @example
 * ```ts
 * const partialDelegate: TemplatePartialDelegate<MyContextType> = (context, options) => {
 *   // rendering logic here
 *   return '<header>...</header>';
 * };
 * ```
 *
 * @category Renderer.Partial
 */
export type TemplatePartialDelegate<TContext = UnknownRecord> = (
  context: TContext,
  options: TemplateRuntimeOptions
) => string;

/**
 * Runtime options passed to template helpers and partials.
 * This type includes data, decorators, helpers, hooks, partials,
 * a flag indicating if it's a partial, and prototype access control.
 *
 * @see https://handlebarsjs.com/api-reference/runtime-options.html
 * @see https://handlebarsjs.com/guide/partials.html
 */
export type TemplateRuntimeOptions = {
  data: UnknownRecord;
  decorators: { [name: string]: Function };
  helpers: { [name: string]: Function };
  hooks: { [name: string]: Function };
  partials: { [name: string]: Function };
  partial: boolean;
  protoAccessControl: UnknownRecord;
};
