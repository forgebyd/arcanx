import { describe, expect, it } from 'vitest';

import {
  createError,
  createErrorFromInstance,
  createErrorFromMessage,
} from '../../source/helpers/error.js';

describe('error helper', () => {
  describe('createError', () => {
    it('should run correctly', () => {
      const err = createError('config-not-defined');

      expect(err).toBeInstanceOf(Error);
      expect(err.message).toMatchSnapshot();
    });

    it('should run with any key and args correctly', () => {
      const errCfgNotDefined = createError('config-not-defined');
      const errCfgNotFound = createError('config-not-found', 'config.ts');
      const errCfgInvalidFormat = createError(
        'config-invalid-format',
        'config.ts',
        'JSONError'
      );
      const errCfgInvalidType = createError(
        'config-invalid-value',
        'config.ts',
        ['Field #1 is required', 'Field #2 is required']
      );

      expect(errCfgNotDefined).toBeInstanceOf(Error);
      expect(errCfgNotFound).toBeInstanceOf(Error);
      expect(errCfgInvalidFormat).toBeInstanceOf(Error);
      expect(errCfgInvalidType).toBeInstanceOf(Error);

      expect(errCfgNotDefined).toMatchSnapshot();
      expect(errCfgNotFound).toMatchSnapshot();
      expect(errCfgInvalidFormat).toMatchSnapshot();
      expect(errCfgInvalidType).toMatchSnapshot();
    });

    it('should throw error when the given key is not exists', () => {
      expect(() =>
        // @ts-expect-error
        createError('non-existing-key')
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('createErrorFromInstance', () => {
    it('should run correctly', () => {
      const err = createErrorFromInstance(new Error('Operation Failed'));

      expect(err).toBeInstanceOf(Error);
      expect(err.message).toMatchSnapshot();
    });

    it('should run with any type of error correctly', () => {
      const errBase = createErrorFromInstance(new Error('Operation Failed'));
      const errReference = createErrorFromInstance(
        new ReferenceError('Operation Failed')
      );
      const errType = createErrorFromInstance(
        new TypeError('Operation Failed')
      );

      expect(errBase).toBeInstanceOf(Error);
      expect(errReference).toBeInstanceOf(Error);
      expect(errType).toBeInstanceOf(Error);

      expect(errBase).toMatchSnapshot();
      expect(errReference).toMatchSnapshot();
      expect(errType).toMatchSnapshot();
    });

    it('should throw error when the given instance is non-error value', () => {
      expect(() =>
        // @ts-expect-error
        createErrorFromInstance('non-error value')
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('createErrorFromMessage', () => {
    it('should run correctly', () => {
      const err = createErrorFromMessage('Operation Failed');

      expect(err).toBeInstanceOf(Error);
      expect(err.message).toMatchSnapshot();
    });

    it('should throw error when the given message is non-string value', () => {
      expect(() =>
        // @ts-expect-error
        createErrorFromMessage(new Error('Operation Failed'))
      ).toThrowErrorMatchingSnapshot();
    });
  });
});
