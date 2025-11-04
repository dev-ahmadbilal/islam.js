/* eslint-disable no-undef, @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// __dirname is automatically available in CommonJS
const assetsDir = path.join(__dirname, '../src/assets');

function cleanupAssets() {
  if (!fs.existsSync(assetsDir)) {
    console.log('No assets directory found. Nothing to clean up.');
    return;
  }

  try {
    console.log('Cleaning up extracted assets...');
    fs.rmSync(assetsDir, { recursive: true, force: true });
    console.log('Assets cleaned up successfully.');
  } catch (error) {
    console.error('Error cleaning up assets:', error);
    throw error;
  }
}

// Export for testing, execute for runtime
if (require.main === module) {
  cleanupAssets();
}

module.exports = { cleanupAssets, assetsDir };
