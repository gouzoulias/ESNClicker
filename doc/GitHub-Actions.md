# Configuration GitHub Actions pour Itch.io

Ce document explique comment configurer le déploiement automatique sur Itch.io via GitHub Actions.

## Workflow configuré

Le workflow `.github/workflows/deploy-itch.yml` se déclenche automatiquement lors de la création d'un **tag Git** commençant par `v` (exemple: `v1.0.0`, `v2.3.1`).

### Étapes du workflow

1. **Checkout** : Récupère le code du repository
2. **Setup Node.js** : Installe Node.js 22.12.0 (version du projet)
3. **Install** : Installe les dépendances avec `npm ci`
4. **Build** : Compile le projet avec `npm run build`
5. **Deploy** : Envoie le dossier `dist/` sur Itch.io avec Butler

## Configuration des secrets GitHub

Pour que le workflow fonctionne, il faut configurer **3 secrets** dans GitHub :

### Accéder à la configuration des secrets

1. Aller sur le repository GitHub
2. Cliquer sur **Settings** (en haut à droite)
3. Dans le menu de gauche : **Secrets and variables** → **Actions**
4. Cliquer sur **New repository secret**

### Secrets à créer

#### 1. `BUTLER_API_KEY`

**Valeur** : Ta clé API Itch.io que tu as déjà générée

**Comment obtenir la clé** (si tu l'as perdue) :
- Aller sur https://itch.io/user/settings/api-keys
- Générer une nouvelle clé API
- **Important** : Copier la clé immédiatement, elle ne sera plus visible après !

#### 2. `ITCH_USER`

**Valeur** : Ton nom d'utilisateur Itch.io

Exemple : Si ton profil est `https://johndoe.itch.io`, le username est `johndoe`

#### 3. `ITCH_GAME`

**Valeur** : Le nom du projet/jeu sur Itch.io

Exemple : Si l'URL du jeu est `https://johndoe.itch.io/esn-clicker`, le nom du jeu est `esn-clicker`

## Utilisation

### Créer un tag et déclencher le déploiement

```bash
# 1. Commit tous les changements
git add .
git commit -m "Préparation release v1.0.0"

# 2. Créer le tag (remplacer X.Y.Z par la version)
git tag v1.0.0

# 3. Pousser le tag sur GitHub
git push origin v1.0.0
```

Le workflow GitHub Actions se déclenche automatiquement et déploie sur Itch.io !

### Suivre l'exécution

1. Aller sur le repository GitHub
2. Cliquer sur l'onglet **Actions**
3. Voir le workflow "Deploy to Itch.io" en cours d'exécution
4. Cliquer dessus pour voir les logs détaillés

### Supprimer un tag (si erreur)

```bash
# Supprimer en local
git tag -d v1.0.0

# Supprimer sur GitHub
git push origin :refs/tags/v1.0.0
```

## Canal de distribution

Le workflow est configuré pour le canal **`html5`** (jeu web HTML5).

Si tu veux déployer pour d'autres plateformes, tu peux modifier le `CHANNEL` dans le fichier workflow :

- `html5` : Jeu web HTML5
- `windows` : Build Windows
- `linux` : Build Linux
- `osx` : Build macOS

Voir la documentation : https://itch.io/docs/butler/pushing.html#channel-names

## Versionning automatique

Le workflow utilise le nom du tag Git comme version sur Itch.io grâce à `VERSION: ${{ github.ref_name }}`.

Exemple : le tag `v1.2.3` apparaîtra comme version `v1.2.3` sur Itch.io.

## Différences avec GitLab CI

Pour référence (venant de GitLab Runner) :

| GitLab CI | GitHub Actions |
|-----------|----------------|
| `.gitlab-ci.yml` | `.github/workflows/*.yml` |
| `image:` | `runs-on:` |
| `script:` | `run:` |
| `$CI_COMMIT_TAG` | `${{ github.ref_name }}` |
| Variables CI/CD | Secrets |
| `only: [tags]` | `on: push: tags:` |

## Troubleshooting

### Le workflow ne se déclenche pas

- Vérifier que le tag commence bien par `v`
- Vérifier que le fichier workflow est bien dans `.github/workflows/`
- Vérifier que le fichier est bien poussé sur la branche `main`

### Erreur d'authentification Butler

- Vérifier que le secret `BUTLER_API_KEY` est bien configuré
- Régénérer une nouvelle clé API sur Itch.io si nécessaire

### Erreur "Game not found"

- Vérifier que `ITCH_USER` et `ITCH_GAME` correspondent exactement à l'URL Itch.io
- Le jeu doit déjà exister sur Itch.io avant le premier déploiement
