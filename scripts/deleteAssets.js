import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname manually for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
