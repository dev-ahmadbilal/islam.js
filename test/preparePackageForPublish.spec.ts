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
const script = require('../scripts/preparePackageForPublish');
const { preparePackageForPublish, libAssetsDir, assetsZipPath } = script;

describe('preparePackageForPublish script', () => {
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

  describe('when lib/assets exists', () => {
    beforeEach(() => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
    });

    test('should zip lib/assets and remove the directory successfully', () => {
      const mockAddLocalFolder = jest.fn();
      const mockWriteZip = jest.fn();
      (AdmZip as jest.Mock).mockImplementation(() => ({
        addLocalFolder: mockAddLocalFolder,
        writeZip: mockWriteZip,
      }));
      (fs.rmSync as jest.Mock).mockImplementation(() => {});

      preparePackageForPublish();

      expect(fs.existsSync).toHaveBeenCalledWith(libAssetsDir);
      expect(AdmZip).toHaveBeenCalled();
      expect(mockAddLocalFolder).toHaveBeenCalledWith(libAssetsDir, 'assets');
      expect(mockWriteZip).toHaveBeenCalledWith(assetsZipPath);
      expect(fs.rmSync).toHaveBeenCalledWith(libAssetsDir, { recursive: true, force: true });
      expect(consoleLogSpy).toHaveBeenCalledWith('Preparing package for publish: zipping lib/assets...');
      expect(consoleLogSpy).toHaveBeenCalledWith('Package prepared: assets.zip created, lib/assets removed.');
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    test('should throw and log error when AdmZip operations fail', () => {
      const mockError = new Error('Zip creation failed');
      (AdmZip as jest.Mock).mockImplementation(() => {
        throw mockError;
      });

      expect(() => {
        preparePackageForPublish();
      }).toThrow('Zip creation failed');

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error preparing package for publish:', mockError);
      expect(fs.rmSync).not.toHaveBeenCalled();
    });

    test('should throw and log error when writeZip fails', () => {
      const mockError = new Error('Write failed');
      const mockAddLocalFolder = jest.fn();
      const mockWriteZip = jest.fn().mockImplementation(() => {
        throw mockError;
      });
      (AdmZip as jest.Mock).mockImplementation(() => ({
        addLocalFolder: mockAddLocalFolder,
        writeZip: mockWriteZip,
      }));

      expect(() => {
        preparePackageForPublish();
      }).toThrow('Write failed');

      expect(mockAddLocalFolder).toHaveBeenCalledWith(libAssetsDir, 'assets');
      expect(mockWriteZip).toHaveBeenCalledWith(assetsZipPath);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error preparing package for publish:', mockError);
      expect(fs.rmSync).not.toHaveBeenCalled();
    });

    test('should throw and log error when fs.rmSync fails', () => {
      const mockError = new Error('Permission denied');
      const mockAddLocalFolder = jest.fn();
      const mockWriteZip = jest.fn();
      (AdmZip as jest.Mock).mockImplementation(() => ({
        addLocalFolder: mockAddLocalFolder,
        writeZip: mockWriteZip,
      }));
      (fs.rmSync as jest.Mock).mockImplementation(() => {
        throw mockError;
      });

      expect(() => {
        preparePackageForPublish();
      }).toThrow('Permission denied');

      expect(mockWriteZip).toHaveBeenCalledWith(assetsZipPath);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error preparing package for publish:', mockError);
    });
  });

  describe('when lib/assets does not exist', () => {
    beforeEach(() => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
    });

    test('should throw an error with descriptive message', () => {
      expect(() => {
        preparePackageForPublish();
      }).toThrow('preparePackageForPublish: lib/assets not found. Run "npm run build" first.');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'preparePackageForPublish: lib/assets not found. Run "npm run build" first.',
      );
      expect(AdmZip).not.toHaveBeenCalled();
      expect(fs.rmSync).not.toHaveBeenCalled();
    });
  });

  describe('path configuration', () => {
    test('should use correct paths', () => {
      expect(libAssetsDir).toContain('lib');
      expect(libAssetsDir).toContain('assets');
      expect(assetsZipPath).toContain('assets.zip');
    });
  });
});
