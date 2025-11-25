/**
 * The `IErrRegistryContract` interface is defining a contract for
 * error messages in a registry. It has the following properties:
 * - `messages`: An array of strings representing error messages.
 * - `details`: An optional array of strings providing additional details about the error.
 * - `suggestions`: An optional array of strings suggesting possible solutions.
 */
export interface IErrRegistryContract {
  messages: string[];
  details?: string[];
  suggestions?: string[];
}

/**
 * A type representing the keys of an error registry.
 *
 * @template TRegistry - The error registry type.
 * @returns The keys of the error registry as strings.
 */
export type ErrRegistryKey<TRegistry> = keyof TRegistry & string;

/**
 * A delegate function that returns an `IErrRegistryContract`.
 *
 * @template TRegistry - The error registry type.
 * @template TKey - The specific key in the error registry.
 * @returns A function that returns an `IErrRegistryContract`.
 */
export type ErrRegistryDelegate<
  TRegistry,
  TKey extends ErrRegistryKey<TRegistry>,
> = TRegistry[TKey] extends (...args: infer TParameters) => IErrRegistryContract
  ? (...args: TParameters) => IErrRegistryContract
  : () => IErrRegistryContract;
