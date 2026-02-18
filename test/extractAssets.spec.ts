/* eslint-disable @typescript-eslint/no-require-imports */
// Mock fs and AdmZip before importing the script
export {}; // 👈 Ensures this file has its own module scope
jest.mock('fs');
jest.mock('adm-zip');
jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
}));

const fs = jest.requireMock('fs');
const AdmZip = jest.requireMock('adm-zip');

// Require script after mocks are set up
const script = require('../scripts/extractAssets');
const { extractAssets, assetsZipPath, assetsDir, isConsumerInstall, getExtractDestination } = script;

describe('extractAssets script', () => {
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
    });

    test('should extract assets successfully', () => {
      const mockExtractAllTo = jest.fn();
      (AdmZip as jest.Mock).mockImplementation(() => ({
        extractAllTo: mockExtractAllTo,
      }));

      extractAssets();

      expect(fs.existsSync).toHaveBeenCalledWith(assetsZipPath);
      expect(AdmZip).toHaveBeenCalledWith(assetsZipPath);
      expect(mockExtractAllTo).toHaveBeenCalledWith(assetsDir, true);
      expect(consoleLogSpy).toHaveBeenCalledWith('Extracting assets...');
      expect(consoleLogSpy).toHaveBeenCalledWith('Assets extracted successfully.');
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    test('should handle extraction errors gracefully', () => {
      const mockError = new Error('Extraction failed');
      const mockExtractAllTo = jest.fn().mockImplementation(() => {
        throw mockError;
      });

      (AdmZip as jest.Mock).mockImplementation(() => ({
        extractAllTo: mockExtractAllTo,
      }));

      extractAssets();

      expect(fs.existsSync).toHaveBeenCalledWith(assetsZipPath);
      expect(AdmZip).toHaveBeenCalledWith(assetsZipPath);
      expect(mockExtractAllTo).toHaveBeenCalledWith(assetsDir, true);
      expect(consoleLogSpy).toHaveBeenCalledWith('Extracting assets...');
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error extracting assets:', mockError);
      expect(consoleLogSpy).not.toHaveBeenCalledWith('Assets extracted successfully.');
    });

    test('should handle AdmZip constructor errors', () => {
      const mockError = new Error('Invalid zip file');
      (AdmZip as jest.Mock).mockImplementation(() => {
        throw mockError;
      });

      extractAssets();

      expect(fs.existsSync).toHaveBeenCalledWith(assetsZipPath);
      expect(AdmZip).toHaveBeenCalledWith(assetsZipPath);
      expect(consoleLogSpy).toHaveBeenCalledWith('Extracting assets...');
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error extracting assets:', mockError);
      expect(consoleLogSpy).not.toHaveBeenCalledWith('Assets extracted successfully.');
    });
  });

  describe('when assets.zip does not exist', () => {
    beforeEach(() => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
    });

    test('should skip extraction and log message', () => {
      extractAssets();

      expect(fs.existsSync).toHaveBeenCalledWith(assetsZipPath);
      expect(AdmZip).not.toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith('No assets archive found. Skipping extraction.');
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });

  describe('path configuration', () => {
    test('should use correct paths', () => {
      expect(assetsZipPath).toContain('assets.zip');
      // Destination is src/ in repo, lib/ when in node_modules
      const dest = getExtractDestination();
      expect(dest).toContain(isConsumerInstall() ? 'lib' : 'src');
      expect(assetsDir).toBe(dest);
    });
  });
});
