/* eslint-disable no-undef, @typescript-eslint/no-require-imports */
/**
 * Runs only before npm publish (prepublishOnly).
 * Zips lib/assets into assets.zip and removes lib/assets so the published package
 * contains the zip instead of the full assets folder (smaller package size).
 */
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const projectRoot = path.join(__dirname, '..');
const libAssetsDir = path.join(projectRoot, 'lib', 'assets');
const assetsZipPath = path.join(projectRoot, 'assets.zip');

function preparePackageForPublish() {
  if (!fs.existsSync(libAssetsDir)) {
    const msg = 'preparePackageForPublish: lib/assets not found. Run "npm run build" first.';
    console.error(msg);
    throw new Error(msg);
  }

  try {
    console.log('Preparing package for publish: zipping lib/assets...');
    const zip = new AdmZip();
    zip.addLocalFolder(libAssetsDir, 'assets');
    zip.writeZip(assetsZipPath);
    fs.rmSync(libAssetsDir, { recursive: true, force: true });
    console.log('Package prepared: assets.zip created, lib/assets removed.');
  } catch (error) {
    console.error('Error preparing package for publish:', error);
    throw error;
  }
}

if (require.main === module) {
  preparePackageForPublish();
}

module.exports = { preparePackageForPublish, libAssetsDir, assetsZipPath };
