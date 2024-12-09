# Script de Nettoyage des Dossiers Temporaires

## Description

Ce script Node.js permet de nettoyer les fichiers temporaires dans divers répertoires systèmes. Il cible les dossiers temporaires courants comme le dossier temporaire par défaut du système et le dossier de cache utilisateur. Il supprime les fichiers selon certains critères, tout en excluant des types de fichiers spécifiques. Le script est disponible sous forme d'exécutables pour Windows, macOS et Linux.

## Fonctionnalités

- Suppression automatique des fichiers inutiles dans les dossiers temporaires.
- Cible les dossiers temporaires systèmes courants et les dossiers de cache utilisateur.
- Exclut certains types de fichiers tels que `.log`, `.lock`, `.bak`, `.config`.
- Affiche le nombre de fichiers supprimés et l'espace libéré.
- Disponible en tant qu'exécutable pré-construit pour **Windows**, **macOS** et **Linux**.

## Installation

### Prérequis

- Aucune installation nécessaire. Télécharge simplement l'exécutable pour ton système d'exploitation.

### Télécharger et exécuter le script

1. **Télécharge le fichier exécutable** correspondant à ton système d'exploitation :

   - **Windows** : `temp_cleanup_win.exe`
   - **macOS** : `temp_cleanup_mac`
   - **Linux** : `temp_cleanup_linux`

2. **Exécute le fichier** :
   - Sur **Windows** : Double-clique sur `temp_cleanup_win.exe`.
   - Sur **macOS/Linux** : Ouvre un terminal et exécute l'exécutable :
     ```bash
     ./temp_cleanup_mac
     ```
     ou
     ```bash
     ./temp_cleanup_linux
     ```

## Fonctionnement

Ce script supprime les fichiers temporaires dans les répertoires suivants :

- Le dossier temporaire par défaut du système.
- Le dossier de cache utilisateur (ex: `.cache`).

Les types de fichiers suivants **ne seront pas supprimés** :

- `.log`
- `.lock`
- `.bak`
- `.config`

### Résumé du nettoyage

Après l'exécution, le script affiche un résumé détaillant :

- Le nombre de fichiers supprimés.
- L'espace libéré en Mo.

## Licence

Ce projet est sous licence MIT.
