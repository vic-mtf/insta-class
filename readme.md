# Projet Insta class

Ce projet est une API développée en Python avec le framework Flask. Ce fichier README vous guidera à travers les étapes nécessaires pour configurer un environnement de développement et installer les dépendances requises.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Python 3 ou supérieur**
- **`pip`** (gestionnaire de paquets Python)

---

## Structure du projet

Voici un aperçu de la structure du projet :

```
projet/
├── configs/                # Dossier contenant les fichiers de configuration
├── data/                   # Dossier pour les données (ex : fichiers JSON, CSV, etc.)
├── public/                 # Dossier pour les fichiers statiques (ex : images, CSS, JS)
├── src/                    # Dossier principal du code source
│   ├── controllers/        # Contrôleurs de l'application
│   ├── models/             # Modèles de données (ex : classes pour la base de données)
│   ├── router/             # Fichiers de routage (ex : définition des routes de l'API)
│   ├── tools/              # Outils utilitaires (ex : fonctions helper)
│   └── app.py              # Point d'entrée de l'application Flask
├── .env                    # Fichier de variables d'environnement
├── .gitignore              # Fichier pour ignorer certains fichiers/dossiers dans Git
├── README.md               # Ce fichier
├── requirements.txt        # Fichier listant les dépendances du projet
└── server.py               # Script pour lancer le serveur Flask
```

---

## Configuration de l'environnement de développement

### 1. Créer un environnement virtuel

Il est recommandé d'utiliser un environnement virtuel pour isoler les dépendances du projet. Pour créer un environnement virtuel, exécutez la commande suivante :

```bash
python -m venv venv
```

### 2. Activer l'environnement virtuel

Une fois l'environnement virtuel créé, activez-le :

- **Sur Windows :**

  ```bash
  venv\Scripts\activate
  ```

- **Sur macOS/Linux :**

  ```bash
  source venv/bin/activate
  ```

### 3. Installer les dépendances

Avec l'environnement virtuel activé, installez les packages nécessaires en utilisant le fichier `requirements.txt` :

```bash
pip install -r requirements.txt
```

### 4. Lancer l'application

Une fois les dépendances installées et les variables d'environnement configurées, vous pouvez lancer l'application Flask en utilisant le fichier `server.py` :

```bash
python server.py
```

L'application sera accessible à l'adresse `http://127.0.0.1:5000/` par défaut.

---

## Utilisation des dossiers

- **`configs/`** : Contient les fichiers de configuration pour l'application (ex : configuration de la base de données, paramètres de production/développement).
- **`data/`** : Utilisé pour stocker des fichiers de données (ex : CSV, JSON) ou la base de données SQLite.
- **`public/`** : Contient les fichiers statiques comme les images, feuilles de style CSS, ou scripts JavaScript.
- **`src/`** : Dossier principal du code source :
  - **`controllers/`** : Gère la logique métier et les interactions avec les modèles.
  - **`models/`** : Définit les modèles de données (ex : classes pour la base de données).
  - **`router/`** : Contient les définitions des routes de l'API.
  - **`tools/`** : Outils utilitaires pour des tâches répétitives ou des fonctions helper.
  - **`app.py`** : Point d'entrée de l'application Flask.
