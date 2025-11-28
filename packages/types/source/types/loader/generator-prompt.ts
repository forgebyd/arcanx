import type { ReadonlyDeep, RequiredDeep, Simplify } from 'type-fest';

export type GeneratorPromptValidatorDelegate = (
  value: string
) => string | Error | undefined;

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

export type GeneratorPromptResolved = RequiredDeep<GeneratorPromptSpec>;

export type GeneratorPromptManifest = ReadonlyDeep<GeneratorPromptResolved>;
