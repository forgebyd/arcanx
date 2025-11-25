/**
 * A result type that can represent either a success with data or a failure with an error.
 * @template TData - The type of the data in case of success.
 * @template TError - The type of the error in case of failure.
 * @returns A union type representing either a success or a failure.
 *
 * @example
 * ```ts
 * const successResult: Result<string> = {
 *   isSuccess: true,
 *   data: 'Operation Succeeded'
 * }
 *
 * const failureResult: Result<never, Error> = {
 *   isSuccess: false,
 *   error: new Error('Operation failed')
 * }
 * ```
 */
export type Result<TData, TError extends Error = Error> =
  | { isSuccess: true; data: TData }
  | { isSuccess: false; error: TError };

/**
 * A successful result containing data.
 *
 * @template TData - The type of the data.
 * @returns A success result with the specified data type.
 *
 * @example
 * ```ts
 * const successResult: Success<string> = {
 *   isSuccess: true,
 *   data: 'Operation Succeeded'
 * }
 * ```
 */
export type Success<TData> = Result<TData, never>;

/**
 * A failure result containing an error.
 * @template TError - The type of the error.
 * @returns A failure result with the specified error type.
 *
 * @example
 * ```ts
 * const failureResult: Failure<Error> = {
 *   isSuccess: false,
 *   error: new Error('Something went wrong')
 * }
 * ```
 */
export type Failure<TError extends Error> = Result<never, TError>;
