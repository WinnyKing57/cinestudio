# CinéStudio 🎬

Application React de découverte de films avec une interface inspirée de Netflix.

## Fonctionnalités

- Parcourir les films populaires
- Rechercher des films par titre
- Voir les détails d'un film (synopsis, date de sortie, note)
- Design responsive avec thème sombre

## Démarrage rapide

### 1. Lancer le serveur

```bash
cd server
npm install
npm run start
```

Le serveur démarre sur `http://localhost:3000`.

### 2. Lancer le client

```bash
npm install
npm run dev
```

Le client démarre sur `http://localhost:5173`.

## API TMDB (optionnel)

Par défaut, l'application utilise un fichier JSON local contenant 29 films.
Pour obtenir des films **en direct depuis TMDB** :

1. Créez un compte gratuit sur [themoviedb.org](https://www.themoviedb.org/settings/api)
2. Générez une clé API (API Key v3)
3. Copiez le fichier d'exemple :

```bash
cp server/.env.example server/.env
```

4. Éditez `server/.env` et remplacez par votre clé :

```
TMDB_API_KEY=votre_cle_ici
```

Le serveur utilisera automatiquement TMDB si la clé est présente, avec un fallback vers le JSON local.

> **Aucune clé API n'est stockée dans le dépôt.** Le fichier `.env` est dans `.gitignore`.

## Technologies

- **Frontend :** React 19, React Router 8, Axios, Sass, Vite 8
- **Backend :** Express 5, dotenv, CORS
