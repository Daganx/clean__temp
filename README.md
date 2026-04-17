# 🧹 clean-temp

**clean__temp** est un outil en ligne de commande (CLI) permettant de nettoyer facilement les fichiers temporaires sur **macOS, Linux et Windows**.
Il analyse différents répertoires système et utilisateur afin d’identifier et supprimer les fichiers inutiles, libérant ainsi de l’espace disque.

---

## 🚀 Fonctionnalités

* 🔍 Analyse des fichiers temporaires système et utilisateur
* 🌐 Nettoyage des caches navigateurs (Chrome, Firefox, Safari)
* 🧠 Mode intelligent (suppression selon l’ancienneté des fichiers)
* ⚡ Mode nettoyage profond (`--deep`)
* 👀 Mode aperçu (`--dry-run` / `--preview`)
* ✅ Confirmation avant suppression
* 📊 Affichage de la taille totale récupérable

---

## 📦 Installation

### 🔽 Télécharger la dernière version

Les binaires sont disponibles dans les **Releases** sur GitHub.

👉 Télécharge le fichier correspondant à ton OS :

* 🍎 `temp-cleaner-macos`
* 🐧 `temp-cleaner-linux`
* 🪟 `temp-cleaner.exe`

---

## ▶️ Utilisation

### 🍎 macOS (IMPORTANT)

Après téléchargement, exécute ces commandes :

```bash
chmod +x temp-cleaner-macos
xattr -d com.apple.quarantine temp-cleaner-macos
./temp-cleaner-macos
```

---

### 🐧 Linux

```bash
chmod +x temp-cleaner-linux
./temp-cleaner-linux
```

---

### 🪟 Windows

Double-clique simplement sur :

```
temp-cleaner.exe
```

ou via terminal :

```bash
temp-cleaner.exe
```

---

## 🧪 Modes disponibles

### ▶️ Nettoyage standard

```bash
./temp-cleaner-macos
```

➡️ Supprime les fichiers temporaires de plus de **24 heures**

---

### 🔥 Nettoyage profond

```bash
./temp-cleaner-macos --deep
```

➡️ Supprime tous les fichiers (mode agressif)

---

### 🌐 Cache navigateurs uniquement

```bash
./temp-cleaner-macos --browser
```

---

### 👀 Mode aperçu

```bash
./temp-cleaner-macos --dry-run
```

ou

```bash
./temp-cleaner-macos --preview
```

➡️ Aucun fichier supprimé

---

## ⚙️ Options

| Option      | Description           |
| ----------- | --------------------- |
| `--deep`    | Nettoyage complet     |
| `--browser` | Nettoyage navigateurs |
| `--dry-run` | Simulation            |
| `--preview` | Alias de dry-run      |

---

## 🧠 Fonctionnement

Le script :

1. Analyse plusieurs dossiers :

   * `/tmp`, `/var/tmp`
   * caches utilisateur
   * caches navigateurs
   * caches applicatifs

2. Calcule :

   * nombre de fichiers
   * taille totale

3. Demande confirmation

4. Supprime les fichiers

---

## ⚠️ Attention

* Certaines suppressions peuvent nécessiter des **droits administrateur**
* Utilise `--dry-run` avant un `--deep`
* Les fichiers temporaires peuvent être recréés automatiquement

---

## 🖥️ Compatibilité

| OS      | Support   |
| ------- | --------- |
| macOS   | ✅ Complet |
| Linux   | ✅ Complet |
| Windows | ✅ Complet |

---

## 📦 Releases

Les versions compilées sont disponibles dans les **Releases GitHub**.

Chaque release contient :

* les binaires pour macOS / Linux / Windows
* les mises à jour et améliorations
* un historique des changements

---

## 💡 Exemple

```bash
./temp-cleaner-macos --deep --dry-run
```

➡️ Analyse complète sans suppression

---

## ⭐ Contribution

Les contributions sont les bienvenues !
N’hésite pas à ouvrir une issue ou proposer une PR.

---

## 📄 Licence

MIT

---

**clean__temp** – Nettoie ton système en quelques secondes 🚀
