/* eslint-disable @typescript-eslint/no-require-imports */
// Mock fs before importing the script
export {}; // 👈 Ensures this file has its own module scope
jest.mock('fs');
jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
}));

const fs = jest.requireMock('fs');

// Require script after mocks are set up
const script = require('../scripts/deleteAssets');
const { deleteAssetsZip, assetsZipPath } = script;

describe('deleteAssetsZip script', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Mock console methods
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe('when assets.zip exists', () => {
    beforeEach(() => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.unlinkSync as jest.Mock).mockImplementation(() => {});
    });

    test('should delete assets.zip successfully', () => {
      deleteAssetsZip();

      expect(fs.existsSync).toHaveBeenCalledWith(assetsZipPath);
      expect(fs.unlinkSync).toHaveBeenCalledWith(assetsZipPath);
      expect(consoleLogSpy).toHaveBeenCalledWith('assets.zip deleted successfully.');
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    test('should handle deletion errors gracefully', () => {
      const mockError = new Error('Permission denied');
      (fs.unlinkSync as jest.Mock).mockImplementation(() => {
        throw mockError;
      });

      deleteAssetsZip();

      expect(fs.existsSync).toHaveBeenCalledWith(assetsZipPath);
      expect(fs.unlinkSync).toHaveBeenCalledWith(assetsZipPath);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error deleting assets.zip:', mockError);
      expect(consoleLogSpy).not.toHaveBeenCalledWith('assets.zip deleted successfully.');
    });
  });

  describe('when assets.zip does not exist', () => {
    beforeEach(() => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
    });

    test('should skip deletion and log message', () => {
      deleteAssetsZip();

      expect(fs.existsSync).toHaveBeenCalledWith(assetsZipPath);
      expect(fs.unlinkSync).not.toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith('No assets.zip file found to delete.');
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });

  describe('path configuration', () => {
    test('should use correct path', () => {
      // Verify the path is correctly set
      expect(assetsZipPath).toContain('assets.zip');
    });
  });

  describe('error handling', () => {
    test('should propagate fs.existsSync errors', () => {
      const mockError = new Error('File system error');
      (fs.existsSync as jest.Mock).mockImplementation(() => {
        throw mockError;
      });

      // In practice, fs.existsSync rarely throws, but if it does,
      // the error will propagate (which is acceptable behavior)
      expect(() => {
        deleteAssetsZip();
      }).toThrow('File system error');
    });
  });
});
