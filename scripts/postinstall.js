/* eslint-disable no-undef, @typescript-eslint/no-require-imports */
/**
 * Postinstall: only when package is installed as dependency (consumer).
 * Extracts assets.zip to lib/ and deletes the zip — once per install (skipped if lib/assets already exists).
 * In repo we do nothing (src/assets exists; no zip).
 */
const { extractAssets, isConsumerInstall, shouldSkipExtraction } = require('./extractAssets');
const { deleteAssetsZip } = require('./deleteAssets');

if (!isConsumerInstall()) return;
if (shouldSkipExtraction()) return;
extractAssets();
deleteAssetsZip();
