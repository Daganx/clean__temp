const fs = require("fs");
const path = require("path");
const os = require("os");

// Chemins des dossiers à nettoyer
const TEMP_DIRS = [
  path.join(os.tmpdir()), // Dossier temporaire par défaut (Windows/Linux/MacOS)
  path.join(os.homedir(), ".cache"), // Cache utilisateur
];

// Types de fichiers à exclure du nettoyage
const EXCLUDED_EXTENSIONS = [".log", ".lock", ".bak", ".config"];

// Fonction pour supprimer les fichiers
function cleanDirectory(dirPath) {
  let filesDeleted = [];
  let totalSizeFreed = 0;

  if (!fs.existsSync(dirPath)) {
    console.log(`Le dossier ${dirPath} n'existe pas. Ignoré.`);
    return { filesDeleted, totalSizeFreed };
  }

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.lstatSync(filePath);

    if (stats.isFile()) {
      const fileExtension = path.extname(file).toLowerCase();

      if (!EXCLUDED_EXTENSIONS.includes(fileExtension)) {
        try {
          const fileSize = stats.size;
          fs.unlinkSync(filePath);
          filesDeleted.push(file);
          totalSizeFreed += fileSize;
        } catch (err) {
          console.error(`Erreur lors de la suppression de ${file}:`, err);
        }
      }
    }
  });

  return { filesDeleted, totalSizeFreed };
}

// Fonction principale pour nettoyer les dossiers
function cleanTempFiles() {
  console.log("Nettoyage des fichiers temporaires...");
  let totalDeletedFiles = 0;
  let totalFreedSpace = 0;

  TEMP_DIRS.forEach((dirPath) => {
    const { filesDeleted, totalSizeFreed } = cleanDirectory(dirPath);

    console.log(`Nettoyé : ${dirPath}`);
    console.log(`  Fichiers supprimés : ${filesDeleted.length}`);
    console.log(
      `  Espace libéré : ${(totalSizeFreed / 1024 / 1024).toFixed(2)} Mo`
    );

    totalDeletedFiles += filesDeleted.length;
    totalFreedSpace += totalSizeFreed;
  });

  console.log("\n=== Résumé du nettoyage ===");
  console.log(`Total des fichiers supprimés : ${totalDeletedFiles}`);
  console.log(
    `Total d'espace libéré : ${(totalFreedSpace / 1024 / 1024).toFixed(2)} Mo`
  );
}

// Lancer le nettoyage
cleanTempFiles();
