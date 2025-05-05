import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import { fileURLToPath } from 'url';

// Define __dirname manually for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
