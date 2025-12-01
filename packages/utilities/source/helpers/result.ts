import type { Failure, Result, Success } from '@arcanx/types';

/**
 * Attempts to execute the given callback function asynchronously,
 * returning a success result if no exception is thrown,
 * or a failure result if an exception is thrown.
 *
 * @template TData - The type of the data in the success result.
 * @template TError - The type of the error in the failure result.
 * @param callback - The asynchronous callback function to execute.
 *
 * @returns A success result if the callback executes without errors,
 *          or a failure result if the callback throws an exception.
 *
 * @example
 * ```ts
 * attemptAsync(async () => ({
 *   message: 'Operation Succeeded'
 * }));
 * ```
 *
 * @category Utility.Result
 */
export const attemptAsync = async <TData, TError extends Error>(
  callback: () => Promise<TData>
): Promise<Result<TData, TError>> => {
  try {
    return success(await callback.apply(null, []));
  } catch (error) {
    return failure(error as TError);
  }
};

/**
 * Attempts to execute the given callback function synchronously,
 * returning a success result if no exception is thrown,
 * or a failure result if an exception is thrown.
 * If the given callback is a Promise instance, an error is thrown.
 *
 * @template TData - The type of the data in the success result.
 * @template TError - The type of the error in the failure result.
 * @param callback - The synchronous callback function to execute.
 *
 * @returns A success result if the callback executes without errors,
 *          or a failure result if the callback throws an exception.
 *
 * @throws {Error} If the given callback is a Promise instance.
 *
 * @example
 * ```ts
 * attemptSync(() => ({
 *   message: 'Operation Succeeded'
 * }));
 * ```
 *
 * @category Utility.Result
 */
export const attemptSync = <TData, TError extends Error>(
  callback: () => TData
): Result<TData, TError> => {
  try {
    if (callback instanceof Promise) {
      // throw error when the given callback is a Promise
      // while executing attemptSync
      throw new Error('Given callback cannot be a promise instance.');
    }

    return success(callback.apply(null, []));
  } catch (error) {
    return failure(error as TError);
  }
};

/**
 * Creates a failure result with the given error.
 *
 * @template TError - The type of the error.
 * @param error - The error to be included in the failure result.
 *
 * @returns A failure result with the given error type.
 *
 * @example
 * ```ts
 * const failureResult: Failure<Error> = failure(
 *   new Error('Operation Failed')
 * );
 * ```
 *
 * @category Utility.Result
 */
export const failure = <TError extends Error>(
  error: TError
): Failure<TError> => ({
  isSuccess: false,
  error,
});

/**
 * Creates a success result with the given data.
 *
 * @template TData - The type of the data in the success result.
 * @param data - The data to be included in the success result.
 *
 * @returns A success result with the given data.
 *
 * @example
 * ```ts
 * const successResult: Success<{ message: string }> = success({
 *    message: 'Operation Succeeded'
 * });
 *
 * @category Utility.Result
 */
export const success = <TData>(data: TData): Success<TData> => ({
  isSuccess: true,
  data,
});
