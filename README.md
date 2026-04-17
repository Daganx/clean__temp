# 🧹 clean-temp

**clean-temp** est un outil en ligne de commande (CLI) permettant de nettoyer facilement les fichiers temporaires sur **macOS, Linux et Windows**.
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

### 1. Cloner le projet

```bash
git clone https://github.com/daganx/clean__temp.git
cd clean__temp
```

### 2. Rendre le script exécutable

```bash
chmod +x index.js
```

### 3. (Optionnel) Lier globalement

```bash
npm link
```

---

## 🧪 Utilisation

### ▶️ Lancer le nettoyage standard

```bash
clean__temp
```

➡️ Analyse :

* `/tmp`
* `/var/tmp`
* caches utilisateur

➡️ Supprime uniquement les fichiers de plus de **24 heures**

---

### 🔥 Mode nettoyage profond

```bash
clean__temp --deep
```

➡️ Analyse :

* fichiers système
* caches utilisateur
* caches applications
* caches navigateurs

➡️ Supprime **tous les fichiers (sans limite d’âge)**

---

### 🌐 Nettoyage des navigateurs uniquement

```bash
clean__temp --browser
```

➡️ Cible :

* Chrome
* Firefox
* Safari

---

### 👀 Mode aperçu (dry-run)

```bash
clean__temp --dry-run
```

ou

```bash
clean__temp --preview
```

➡️ Affiche les fichiers **sans les supprimer**

---

## ⚙️ Options disponibles

| Option      | Description                                 |
| ----------- | ------------------------------------------- |
| `--deep`    | Nettoyage complet (agressif)                |
| `--browser` | Nettoyage des caches navigateurs uniquement |
| `--dry-run` | Simulation sans suppression                 |
| `--preview` | Alias de `--dry-run`                        |

---

## 🧠 Fonctionnement

Le script :

1. Définit plusieurs chemins de fichiers temporaires :

   * système
   * utilisateur
   * navigateurs
   * caches applicatifs

2. Analyse les fichiers :

   * calcule leur taille
   * vérifie leur ancienneté

3. Affiche un résumé :

   * nombre de fichiers
   * taille totale

4. Demande confirmation à l’utilisateur

5. Supprime les fichiers sélectionnés

---

## ⚠️ Attention

* Certaines suppressions peuvent nécessiter des **droits administrateur**
* Évite d’utiliser `--deep` sans vérifier avec `--dry-run` avant
* Certains fichiers temporaires peuvent être recréés automatiquement par le système

---

## 🖥️ Compatibilité

| OS      | Support                                          |
| ------- | ------------------------------------------------ |
| macOS   | ✅ Complet                                        |
| Linux   | ✅ Partiel (selon distribution)                   |
| Windows | ⚠️ Non natif (adaptation des chemins nécessaire) |

---

## 🛠️ Améliorations possibles

* Support complet Windows (`AppData`, `Temp`)
* Interface graphique (Electron / Tauri)
* Planification automatique (cron)
* Ajout d’un mode sécurisé (whitelist)

---

## 📄 Licence

MIT

---

## 👨‍💻 Auteur

Projet développé pour simplifier le nettoyage système via Node.js.

---

## 💡 Exemple

```bash
clean__temp --deep --dry-run
```

➡️ Analyse complète sans suppression pour voir ce qui sera nettoyé.

---

## ⭐ Contribution

Les contributions sont les bienvenues !
N’hésite pas à ouvrir une issue ou proposer une PR.

---

**clean--temp** – Nettoie ton système en quelques secondes 🚀
