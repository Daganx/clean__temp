#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import os from 'os';
import readline from 'readline';

const TEMP_PATHS = {
  system: [
    '/tmp',
    '/var/tmp',
    '/private/tmp',
  ],
  user: [
    path.join(os.homedir(), 'Library/Caches'),
    path.join(os.homedir(), 'Library/Logs'),
    path.join(os.tmpdir()),
  ],
  browser: [
    path.join(os.homedir(), 'Library/Caches/Google/Chrome'),
    path.join(os.homedir(), 'Library/Caches/Firefox'),
    path.join(os.homedir(), 'Library/Caches/Safari'),
  ],
  appCache: [
    path.join(os.homedir(), 'Library/Caches/com.apple.Safari'),
    path.join(os.homedir(), 'Library/Caches/com.apple.IntlDataCache'),
    path.join(os.homedir(), 'Library/Caches/com.apple.Xcode'),
  ]
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileAge(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return (Date.now() - stats.mtimeMs) / (1000 * 60 * 60);
  } catch {
    return 0;
  }
}

function scanDirectory(dirPath, maxAgeHours = null) {
  const results = { files: [], dirs: [], totalSize: 0 };

  if (!fs.existsSync(dirPath)) return results;

  try {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);

      try {
        if (item.isFile()) {
          const stats = fs.statSync(fullPath);
          const age = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60);

          if (maxAgeHours === null || age >= maxAgeHours) {
            results.files.push(fullPath);
            results.totalSize += stats.size;
          }
        } else if (item.isDirectory()) {
          results.dirs.push(fullPath);
        }
      } catch {
        continue;
      }
    }
  } catch {
    return results;
  }

  return results;
}

function scanAllPaths(paths, maxAgeHours = null) {
  const allFiles = [];
  let totalSize = 0;

  for (const dirPath of paths) {
    const result = scanDirectory(dirPath, maxAgeHours);
    allFiles.push(...result.files);
    totalSize += result.totalSize;
  }

  return { files: allFiles, totalSize };
}

async function confirm(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(message + ' (o/n): ', (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'o' || answer.toLowerCase() === 'yes');
    });
  });
}

function printHeader(text) {
  console.log('\n' + '='.repeat(50));
  console.log(text);
  console.log('='.repeat(50));
}

async function cleanFiles(files) {
  let deletedCount = 0;
  let deletedSize = 0;

  for (const file of files) {
    try {
      const stats = fs.statSync(file);
      fs.unlinkSync(file);
      deletedCount++;
      deletedSize += stats.size;
      console.log(`  Supprimé: ${path.basename(file)}`);
    } catch (err) {
      console.log(`  Erreur: ${file} - ${err.message}`);
    }
  }

  return { deletedCount, deletedSize };
}

async function cleanDirectory(dirPath) {
  let deletedCount = 0;
  let deletedSize = 0;

  if (!fs.existsSync(dirPath)) return { deletedCount, deletedSize };

  try {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);

      try {
        if (item.isFile()) {
          const stats = fs.statSync(fullPath);
          fs.unlinkSync(fullPath);
          deletedCount++;
          deletedSize += stats.size;
          console.log(`  Supprimé: ${path.basename(fullPath)}`);
        } else if (item.isDirectory()) {
          const subResult = await cleanDirectory(fullPath);
          deletedCount += subResult.deletedCount;
          deletedSize += subResult.deletedSize;

          try {
            fs.rmdirSync(fullPath);
            console.log(`  Dossier vide supprimé: ${path.basename(fullPath)}`);
          } catch {
          }
        }
      } catch (err) {
        console.log(`  Erreur: ${fullPath} - ${err.message}`);
      }
    }
  } catch (err) {
    console.log(`  Erreur d'accès: ${dirPath}`);
  }

  return { deletedCount, deletedSize };
}

async function main() {
  console.log('\n🧹 Nettoyeur de fichiers temporaires pour macOS\n');

  const args = process.argv.slice(2);
  const mode = args.includes('--deep') ? 'deep' : args.includes('--browser') ? 'browser' : 'normal';
  const dryRun = args.includes('--dry-run') || args.includes('--preview');

  const pathsToScan = [];

  if (mode === 'deep') {
    pathsToScan.push(...TEMP_PATHS.system, ...TEMP_PATHS.user, ...TEMP_PATHS.browser, ...TEMP_PATHS.appCache);
  } else if (mode === 'browser') {
    pathsToScan.push(...TEMP_PATHS.browser);
  } else {
    pathsToScan.push(...TEMP_PATHS.system, ...TEMP_PATHS.user);
  }

  printHeader('Analyse en cours...');

  const result = scanAllPaths(pathsToScan, mode === 'deep' ? 0 : 24);

  console.log(`\nFichiers trouvés: ${result.files.length}`);
  console.log(`Taille totale: ${formatBytes(result.totalSize)}`);

  if (dryRun || result.files.length === 0) {
    console.log('\n--- Aperçu des fichiers à supprimer ---\n');
    result.files.slice(0, 50).forEach(file => {
      console.log(`  ${file}`);
    });
    if (result.files.length > 50) {
      console.log(`  ... et ${result.files.length - 50} autres fichiers`);
    }
    console.log('\nMode aperçu - aucun fichier supprimé.');
    return;
  }

  printHeader('Résumé du nettoyage');

  console.log(`\nMode: ${mode}`);
  console.log(`Fichiers: ${result.files.length}`);
  console.log(`Taille: ${formatBytes(result.totalSize)}`);
  console.log(`Aperçu: ${dryRun ? 'Oui' : 'Non'}`);

  const proceed = await confirm('\nVoulez-vous supprimer ces fichiers?');

  if (!proceed) {
    console.log('\nNettoyage annulé.');
    return;
  }

  printHeader('Nettoyage en cours...');

  const cleanResult = await cleanFiles(result.files);

  printHeader('Terminé');

  console.log(`\nFichiers supprimés: ${cleanResult.deletedCount}`);
  console.log(`Taille libérée: ${formatBytes(cleanResult.deletedSize)}`);
}

main().catch(console.error);
