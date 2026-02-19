/* eslint-disable @typescript-eslint/no-require-imports */
// Mock fs, AdmZip, and path before importing the script
export {}; // 👈 Ensures this file has its own module scope
jest.mock('fs');
jest.mock('adm-zip');
jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
}));

const fs = jest.requireMock('fs');
const AdmZip = jest.requireMock('adm-zip');

// Require script after mocks are set up
const script = require('../scripts/zipAssets');
const { zipAssets, srcAssetsDir, assetsZipPath } = script;

describe('zipAssets script', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe('when src/assets exists', () => {
    beforeEach(() => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
    });

    test('should create assets.zip successfully', () => {
      const mockAddLocalFolder = jest.fn();
      const mockWriteZip = jest.fn();
      (AdmZip as jest.Mock).mockImplementation(() => ({
        addLocalFolder: mockAddLocalFolder,
        writeZip: mockWriteZip,
      }));

      zipAssets();

      expect(fs.existsSync).toHaveBeenCalledWith(srcAssetsDir);
      expect(AdmZip).toHaveBeenCalled();
      expect(mockAddLocalFolder).toHaveBeenCalledWith(srcAssetsDir, 'assets');
      expect(mockWriteZip).toHaveBeenCalledWith(assetsZipPath);
      expect(consoleLogSpy).toHaveBeenCalledWith('assets.zip created successfully from src/assets.');
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    test('should throw and log error when AdmZip constructor fails', () => {
      const mockError = new Error('AdmZip init failed');
      (AdmZip as jest.Mock).mockImplementation(() => {
        throw mockError;
      });

      expect(() => {
        zipAssets();
      }).toThrow('AdmZip init failed');

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating assets.zip:', mockError);
    });

    test('should throw and log error when writeZip fails', () => {
      const mockError = new Error('Disk full');
      const mockAddLocalFolder = jest.fn();
      const mockWriteZip = jest.fn().mockImplementation(() => {
        throw mockError;
      });
      (AdmZip as jest.Mock).mockImplementation(() => ({
        addLocalFolder: mockAddLocalFolder,
        writeZip: mockWriteZip,
      }));

      expect(() => {
        zipAssets();
      }).toThrow('Disk full');

      expect(mockAddLocalFolder).toHaveBeenCalledWith(srcAssetsDir, 'assets');
      expect(mockWriteZip).toHaveBeenCalledWith(assetsZipPath);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating assets.zip:', mockError);
      expect(consoleLogSpy).not.toHaveBeenCalledWith('assets.zip created successfully from src/assets.');
    });

    test('should throw and log error when addLocalFolder fails', () => {
      const mockError = new Error('Read error');
      const mockAddLocalFolder = jest.fn().mockImplementation(() => {
        throw mockError;
      });
      (AdmZip as jest.Mock).mockImplementation(() => ({
        addLocalFolder: mockAddLocalFolder,
        writeZip: jest.fn(),
      }));

      expect(() => {
        zipAssets();
      }).toThrow('Read error');

      expect(mockAddLocalFolder).toHaveBeenCalledWith(srcAssetsDir, 'assets');
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating assets.zip:', mockError);
    });
  });

  describe('when src/assets does not exist', () => {
    beforeEach(() => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
    });

    test('should skip zipping and log message', () => {
      zipAssets();

      expect(fs.existsSync).toHaveBeenCalledWith(srcAssetsDir);
      expect(AdmZip).not.toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith('No src/assets directory found. Nothing to zip.');
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });

  describe('path configuration', () => {
    test('should use correct paths', () => {
      expect(srcAssetsDir).toContain('src');
      expect(srcAssetsDir).toContain('assets');
      expect(assetsZipPath).toContain('assets.zip');
    });
  });
});
