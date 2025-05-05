/* eslint-disable no-undef, @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

// __dirname is already available in CommonJS
const assetsZipPath = path.join(__dirname, '../assets.zip'); // Moved outside src
const assetsDir = path.join(__dirname, '../src'); // Destination folder

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

extractAssets();
