# Semantic Versioning et Automation des Releases

Ce document explique le système de versioning automatique et génération de changelogs du projet.

## Vue d'ensemble

Le projet utilise **semantic-release** pour automatiser :
- Le versioning sémantique basé sur les commits
- La génération du CHANGELOG.md
- La création des tags Git
- La création des GitHub Releases
- Le déclenchement du déploiement Itch.io

## Workflow complet

```
Commit Conventional → Push sur main → semantic-release → Tag créé → Deploy Itch.io
                                            ↓
                                    GitHub Release + Changelog
```

### Étapes détaillées

1. **Développeur commit** avec format Conventional Commits
2. **Push ou merge sur main** déclenche le workflow `release.yml`
3. **semantic-release** analyse les commits depuis la dernière release :
   - Détermine le type de bump de version (major/minor/patch)
   - Génère le CHANGELOG.md
   - Met à jour `package.json` avec la nouvelle version
   - Crée un commit de release (avec `[skip ci]` pour éviter la boucle)
   - Crée un tag Git (ex: `v1.2.0`)
   - Crée une GitHub Release avec les notes de version
4. **Le tag déclenche** `deploy-itch.yml` qui build et déploie sur Itch.io
5. **Étape manuelle** : Copier le changelog de la GitHub Release vers les devlogs Itch.io (30 secondes)

## Format Conventional Commits

### Structure de base

```
<type>(<scope>): <description>

[corps optionnel]

[footer optionnel]
```

### Types et leur effet sur la version

| Type | Description | Impact version | Exemple |
|------|-------------|----------------|---------|
| `feat:` | Nouvelle fonctionnalité | MINOR (1.0.0 → 1.1.0) | `feat: ajouter thème dark mode` |
| `fix:` | Correction de bug | PATCH (1.0.0 → 1.0.1) | `fix: corriger le calcul du prix` |
| `perf:` | Amélioration de performance | PATCH (1.0.0 → 1.0.1) | `perf: optimiser le rendu` |
| `revert:` | Annulation d'un commit | PATCH (1.0.0 → 1.0.1) | `revert: annuler feat: xyz` |
| `docs:` | Documentation | Aucun | `docs: mettre à jour README` |
| `style:` | Formatage, style | Aucun | `style: formater avec Prettier` |
| `refactor:` | Refactoring | Aucun | `refactor: simplifier la logique` |
| `test:` | Tests | Aucun | `test: ajouter tests unitaires` |
| `build:` | Build système | Aucun | `build: mettre à jour Vite` |
| `ci:` | CI/CD | Aucun | `ci: ajouter workflow GitHub` |
| `chore:` | Maintenance | Aucun | `chore: nettoyer le code` |

### Breaking Changes (MAJOR)

Pour indiquer un changement incompatible (bump MAJOR : 1.0.0 → 2.0.0) :

**Option 1 : Ajouter `!` après le type**
```
feat!: refonte complète du système de sauvegarde
```

**Option 2 : Footer `BREAKING CHANGE:`**
```
feat: migration vers nouveau format de sauvegarde

BREAKING CHANGE: Les anciennes sauvegardes ne sont plus compatibles.
Il faut réinitialiser le jeu.
```

### Exemples complets

```bash
# Nouvelle fonctionnalité (MINOR bump)
feat: ajouter système de thèmes de couleur avec 5 thèmes

# Correction de bug (PATCH bump)
fix: corriger le nom de la propriété codeLines

# Fonctionnalité avec scope (MINOR bump)
feat(ui): ajouter sélecteur de thème dans le header

# Breaking change (MAJOR bump)
feat!: migration vers React 19

BREAKING CHANGE: Le projet nécessite maintenant Node.js 20+

# Documentation (pas de release)
docs: documenter le système de sauvegarde

# Refactoring (pas de release)
refactor(game): simplifier la logique des upgrades

# Plusieurs types dans un commit (prend le plus haut niveau)
feat: ajouter bouton d'export de sauvegarde
fix: corriger le bug d'import
```

## Configuration

### Fichiers de configuration

- **`.releaserc.json`** : Configuration semantic-release
  - Plugins utilisés : commit-analyzer, release-notes-generator, changelog, npm, git, github
  - Génération du CHANGELOG.md en français
  - Sections personnalisées avec emojis

- **`commitlint.config.js`** : Validation des commits
  - Valide le format Conventional Commits
  - Permet les messages en français

- **`.github/workflows/release.yml`** : Workflow GitHub Actions
  - Se déclenche sur push vers `main`
  - Nécessite `GITHUB_TOKEN` (fourni automatiquement)

### Permissions GitHub Actions

Le workflow `release.yml` nécessite ces permissions (déjà configurées) :
- `contents: write` - Pour créer releases et pusher commits
- `issues: write` - Pour commenter sur issues fermées
- `pull-requests: write` - Pour commenter sur PRs

## Utilisation

### Faire une nouvelle release

1. **Créer une branche** pour ta feature :
   ```bash
   git checkout -b feature/ma-feature
   ```

2. **Faire des commits** avec Conventional Commits :
   ```bash
   git commit -m "feat: ajouter nouvelle mécanique de jeu"
   git commit -m "fix: corriger bug de sauvegarde"
   ```

3. **Push et créer une PR** :
   ```bash
   git push -u origin feature/ma-feature
   # Créer PR sur GitHub
   ```

4. **Merger sur main** :
   - Une fois la PR approuvée et mergée
   - semantic-release s'exécute automatiquement
   - Une nouvelle version est créée si des commits `feat`/`fix`/`perf` sont détectés

5. **Vérifier** :
   - Aller sur l'onglet **Actions** pour voir le workflow `Release`
   - Aller sur l'onglet **Releases** pour voir la GitHub Release créée
   - Le workflow `Deploy to Itch.io` se déclenche automatiquement sur le nouveau tag

6. **Poster le devlog Itch.io** (manuel) :
   - Copier le changelog depuis la GitHub Release
   - Aller sur itch.io et créer un devlog
   - Coller le changelog
   - Publier

### Si aucune release n'est créée

semantic-release ne créera PAS de release si :
- Tous les commits sont de type `docs`, `style`, `refactor`, `test`, `chore`, `build`
- Aucun commit depuis la dernière release
- Les commits ne suivent pas le format Conventional Commits

Pour forcer une release, assure-toi d'avoir au moins un commit de type `feat`, `fix`, ou `perf`.

## Format du CHANGELOG généré

Le CHANGELOG.md est généré automatiquement avec cette structure :

```markdown
## [1.2.0](https://github.com/user/repo/compare/v1.1.0...v1.2.0) (2025-10-31)

### 🎉 Nouvelles fonctionnalités

* ajouter système de thèmes avec 5 thèmes ([abc1234](commit-link))
* ajouter sélecteur de thème dans header ([def5678](commit-link))

### 🐛 Corrections de bugs

* corriger application des thèmes ([ghi9012](commit-link))

### ⚡ Améliorations de performance

* optimiser rendu avec React.memo ([jkl3456](commit-link))
```

## Troubleshooting

### Le workflow release échoue

**Vérifier** :
1. Que le commit suit bien le format Conventional Commits
2. Que les permissions GitHub Actions sont correctes
3. Les logs dans l'onglet Actions pour voir l'erreur exacte

### semantic-release ne crée pas de version

**Causes possibles** :
1. Pas de commits `feat`/`fix`/`perf` depuis la dernière release
2. Commits mal formatés (ne suivent pas Conventional Commits)
3. Tous les commits sont de type `docs`/`chore`/etc.

**Solution** : Vérifier le format des commits avec :
```bash
npx commitlint --from=HEAD~1
```

### Itch.io ne se met pas à jour

**Vérifier** :
1. Que le workflow `Deploy to Itch.io` s'est bien déclenché après le tag
2. Que les secrets `BUTLER_API_KEY`, `ITCH_USER`, `ITCH_GAME` sont bien configurés
3. Les logs du workflow de déploiement

### commitlint bloque mes commits

Si commitlint refuse ton commit :
```
⧗   input: mon commit sans format
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]
```

**Solution** : Reformater le commit avec un type valide :
```bash
git commit --amend -m "feat: mon commit avec format"
```

## Références

- [Conventional Commits](https://www.conventionalcommits.org/)
- [semantic-release](https://semantic-release.gitbook.io/)
- [commitlint](https://commitlint.js.org/)
- [Semantic Versioning](https://semver.org/)

## Notes importantes

- ⚠️ **Les commits directs sur main** déclenchent semantic-release immédiatement
- ⚠️ **Toujours passer par des PR** pour éviter des releases non désirées
- ✅ **semantic-release ajoute `[skip ci]`** à ses commits pour éviter les boucles infinies
- ✅ **Le CHANGELOG.md est versionné** dans le repository
- ⚠️ **Itch.io devlogs sont manuels** car pas d'API disponible (copier-coller depuis GitHub Release)
