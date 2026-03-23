/* eslint-disable no-undef, @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const projectRoot = path.join(__dirname, '..');
const assetsZipPath = path.join(projectRoot, 'assets.zip');

/**
 * True when this package is installed as a dependency (inside node_modules).
 */
function isConsumerInstall() {
  return __dirname.includes('node_modules');
}

/**
 * Extraction destination: lib/ when consumed as dependency (so require() resolves),
 * src/ when in repo (for build).
 */
function getExtractDestination() {
  return isConsumerInstall()
    ? path.join(projectRoot, 'lib')
    : path.join(projectRoot, 'src');
}

const assetsDir = getExtractDestination();

/**
 * When installed as dependency, only extract on first install (when lib/assets does not exist).
 */
function shouldSkipExtraction() {
  if (!isConsumerInstall()) return false;
  const libAssets = path.join(projectRoot, 'lib', 'assets');
  if (!fs.existsSync(libAssets)) return false;
  try {
    const entries = fs.readdirSync(libAssets);
    return entries.length > 0;
  } catch {
    return false;
  }
}

function extractAssets() {
  if (!fs.existsSync(assetsZipPath)) {
    console.log('No assets archive found. Skipping extraction.');
    return;
  }

  try {
    console.log('Extracting assets...');
    const zip = new AdmZip(assetsZipPath);
    zip.extractAllTo(assetsDir, true);
    console.log('Assets extracted successfully.');
  } catch (error) {
    console.error('Error extracting assets:', error);
  }
}

if (require.main === module) {
  extractAssets();
}

module.exports = {
  extractAssets,
  assetsZipPath,
  assetsDir,
  isConsumerInstall,
  getExtractDestination,
  shouldSkipExtraction,
};
