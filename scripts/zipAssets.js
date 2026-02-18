/* eslint-disable no-undef, @typescript-eslint/no-require-imports */
/**
 * Creates assets.zip from src/assets.
 * Use this in the repo when you have src/assets and want to update assets.zip (e.g. before committing).
 */
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const projectRoot = path.join(__dirname, '..');
const srcAssetsDir = path.join(projectRoot, 'src', 'assets');
const assetsZipPath = path.join(projectRoot, 'assets.zip');

function zipAssets() {
  if (!fs.existsSync(srcAssetsDir)) {
    console.log('No src/assets directory found. Nothing to zip.');
    return;
  }

  try {
    const zip = new AdmZip();
    zip.addLocalFolder(srcAssetsDir, 'assets');
    zip.writeZip(assetsZipPath);
    console.log('assets.zip created successfully from src/assets.');
  } catch (error) {
    console.error('Error creating assets.zip:', error);
    throw error;
  }
}

if (require.main === module) {
  zipAssets();
}

module.exports = { zipAssets, srcAssetsDir, assetsZipPath };
