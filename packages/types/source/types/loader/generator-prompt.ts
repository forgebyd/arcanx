import type { ReadonlyDeep, RequiredDeep, Simplify } from 'type-fest';

/**
 * A function that validates the value of a prompt.
 * This function should return an error message
 * if the value is invalid, or undefined if the value is valid.
 *
 * @param value - The value to validate
 *
 * @returns An error message if the value is invalid, or undefined if the value is valid.
 *
 * @see {@link GeneratorPromptSpec}
 * @see {@link GeneratorPromptResolved}
 * @see {@link GeneratorPromptManifest}
 *
 * @category Loader
 */
export type GeneratorPromptValidatorDelegate = (
  value: string
) => string | Error | undefined;

/**
 * A prompt specification for a generator.
 * This type is used to ensure type safety when working with prompts.
 *
 * @category Loader
 */
export type GeneratorPromptSpec = Simplify<
  {
    name: string;
    message: string;
  } & (
    | {
        type: 'text';
        placeholder?: string;
        defaultValue?: string;
        initialValue?: string;
        validate?: GeneratorPromptValidatorDelegate;
      }
    | {
        type: 'confirm';
        activeLabel?: string;
        inactiveLabel?: string;
        initialValue?: boolean;
      }
    | {
        type: 'select';
        options: {
          label: string;
          value: string;
          hint?: string;
          disabled?: boolean;
        }[];
        initialValue?: string;
        maxItems?: number;
      }
  )
>;

/**
 * A resolved representation of a prompt.
 * This type is used to ensure type safety when working with prompts.
 *
 * @category Loader
 */
export type GeneratorPromptResolved = RequiredDeep<GeneratorPromptSpec>;

/**
 * A manifest for a prompt.
 * This type is used to ensure type safety when working with prompts.
 *
 * @category Loader
 */
export type GeneratorPromptManifest = ReadonlyDeep<GeneratorPromptResolved>;
