/* eslint-disable no-undef, @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// __dirname is automatically available in CommonJS
const assetsZipPath = path.join(__dirname, '../assets.zip');

function deleteAssetsZip() {
  if (!fs.existsSync(assetsZipPath)) {
    console.log('No assets.zip file found to delete.');
    return;
  }

  try {
    fs.unlinkSync(assetsZipPath);
    console.log('assets.zip deleted successfully.');
  } catch (error) {
    console.error('Error deleting assets.zip:', error);
  }
}

deleteAssetsZip();
