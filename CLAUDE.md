# CLAUDE.md

Ce fichier fournit des orientations à Claude Code (claude.ai/code) lors du travail sur ce repository.

## Environnement technique

**Versions** :
- Node.js : 22.12.0 (géré par Volta)
- npm : 10.9.2
- Vite : 7.1.12
- React : 18.2.0
- TypeScript : 5.0.2
- Sass : 1.93.2

**Volta** : Le projet utilise Volta pour gérer les versions de Node.js et npm. Les versions sont définies dans `package.json` sous la clé `volta`.

## Commandes de développement

- `npm i` - Installer les dépendances
- `npm run dev` - Démarrer le serveur de développement avec Vite
- `npm run build` - Build de production (compile TypeScript puis Vite build)
- `npm run lint` - Exécuter ESLint avec support TypeScript et Prettier
- `npm run format` - Formater le code avec Prettier
- `npm run preview` - Prévisualiser le build de production localement

## Vue d'ensemble du projet

ESN Clicker est un idle/clicker game basé sur React qui simule la gestion d'une Entreprise de Service Numérique. Les joueurs commencent par taper du code manuellement, puis recrutent des développeurs et des product owners pour automatiser la production et la vente de code.

## Architecture

### Styles et CSS

Le projet utilise **SCSS (Sass)** moderne pour la gestion des styles :

- **CSS Modules** : Chaque composant a son fichier `.module.scss` dédié
- **Variables globales** : `src/styles/variables.scss` contient les couleurs, espacements, et autres constantes
- **Styles globaux** : `src/styles/global.scss` pour les styles de base de l'application
- **Syntaxe moderne** : Utilise `@use` au lieu de l'ancien `@import` (dépréciés dans Sass 3.0)
- **Pas de styles inline** : Tous les styles inline ont été migrés vers SCSS pour une meilleure maintenabilité

Structure des fichiers de styles :

```
src/
  styles/
    variables.scss  # Variables (couleurs, espacements, etc.)
    global.scss     # Styles globaux
  Components/
    ComponentName/
      ComponentName.tsx          # Composant React
      ComponentName.module.scss  # Styles du composant
  App.module.scss  # Styles du composant App à la racine
```

**Important** : Utiliser `@use '../../styles/variables' as *;` pour importer les variables dans les modules SCSS.

#### Système de thèmes

Le jeu supporte **5 thèmes de couleur** :
- **Clair** (défaut) : Thème classique avec fond blanc
- **Sombre** : Dark mode pour réduire la fatigue visuelle
- **Matrix** : Esthétique vert phosphorescent sur fond noir
- **Cyberpunk** : Néons violet/cyan sur fond sombre
- **Corporate** : Style professionnel bleu/gris

Les thèmes sont implémentés via **CSS Custom Properties** dans `variables.scss` :
- Définitions des couleurs dans `:root` (thème clair)
- Surcharge via classes `body.theme-{nom}` pour les autres thèmes
- Variables SCSS pointent vers les custom properties avec `var(--color-name)`
- Changement de thème instantané sans recompilation

**Couleurs disponibles** :
- `$primary-color`, `$secondary-color`, `$background-color`
- `$border-color`, `$text-color`, `$text-secondary`
- `$button-hover`, `$success-*`, `$error-*`, `$warning-*`
- `$disabled-bg`, `$disabled-text`

**Sélecteur de thème** :
- Composant `ThemeSelector` dans le header
- Sauvegarde automatique du thème choisi
- Application du thème via classe sur `<body>`

**Pour ajouter un nouveau thème** :
1. Dans `src/styles/variables.scss` : ajouter une section `body.theme-{nom}` avec toutes les custom properties
2. Dans `src/Components/ThemeSelector/ThemeSelector.tsx` : ajouter le thème dans le tableau `THEMES`
3. Dans `src/App.tsx` : ajouter la classe du nouveau thème dans `document.body.classList.remove()` (ligne 23)

### Alias de chemins

Le projet utilise des alias de chemins pour simplifier les imports :

- `@components/*` → `src/Components/*`
- `@game/*` → `src/Game/*`
- `@utils/*` → `src/Utils/*`
- `@assets/*` → `src/assets/*`
- `@/*` → `src/*`

Exemple d'import :
```typescript
// ❌ Ancien style (éviter)
import { gameContext } from '../../Game/GameContext';

// ✅ Nouveau style (préféré)
import { gameContext } from '@game/GameContext';
```

Ces alias sont configurés dans `vite.config.ts` et `tsconfig.json`.

### Boucle de jeu principale

Le jeu fonctionne sur un cycle de tick de 100ms (`useTick` hook dans `src/Utils/useTick.ts`) qui gère :

- La production automatique de code par les développeurs recrutés
- La vente automatique de code par les product owners
- L'équilibrage des ressources (lignes de code vs capacité de vente)

### Gestion d'état

Tout l'état du jeu est géré via React Context (`GameContext`) fourni par le composant `Game` :

- **Ressources** : lignes de code, argent, totaux accumulés
- **Équipes** : développeurs (`Dev`), product owners (`PO`), personnel auxiliaire (`Aux`)
- **Améliorations** : upgrades achetés et leurs effets
- **Mécaniques manuelles** : multiplicateurs de productivité, force de vente

### Mécaniques de jeu principales

#### Génération manuelle de code

- Les joueurs tapent dans une textarea pour générer du code
- Le contenu du code est récupéré depuis `src/assets/code.txt` (mis à jour automatiquement par le pre-commit hook)
- La productivité manuelle peut être améliorée par des upgrades

#### Production automatique

- **Les développeurs** produisent des lignes de code par seconde selon leur valeur `productivity`
- **Les Product Owners** vendent des lignes de code par seconde selon leur valeur `productivity`
- Chaque rôle a une progression : Stagiaire → Alternant → ... → CTO
- Les prix augmentent d'un facteur 1.25 (`PriceIncrease`) lors de l'achat

#### Système d'upgrades

Les upgrades actuels affectent la productivité manuelle, la force de vente, ou les prix du code. Les effets des upgrades sont appliqués immédiatement lors de l'achat.

### Structure des composants

Le projet utilise une architecture modulaire avec des composants organisés par dossier :

```
src/
  Components/
    ComponentName/
      ComponentName.tsx          # Code React
      ComponentName.module.scss  # Styles CSS Modules
  App.tsx                  # Layout UI principal
  App.module.scss          # Styles de App
  Game/
    Game.tsx               # Gestion d'état centralisée
    GameContext.ts         # Définitions de types et contexte
    Dev.ts, POs.ts         # Entités de jeu
    Upgrade.ts             # Système d'upgrades
  Utils/
    useTick.ts             # Hook pour la boucle de jeu
    SaveGame.ts            # Système de sauvegarde
    util.ts                # Utilitaires divers
```

**Conventions** :
- Chaque composant a son propre dossier (sauf `App.tsx` à la racine)
- Utiliser CSS Modules pour le styling (`.module.scss`)
- Utiliser les alias de chemins (`@components`, `@game`, etc.)

### Fichiers importants

- `src/Game/GameContext.ts` - Définitions de types et valeurs par défaut pour tout l'état du jeu
- `src/Game/Dev.ts` - Rôles de développeurs et leurs statistiques initiales
- `src/Game/POs.ts` - Rôles de Product Owners et leurs statistiques initiales
- `src/Game/Upgrade.ts` - Upgrades disponibles et leurs effets
- `src/Utils/useTick.ts` - Implémentation de la boucle de jeu

## Notes de développement

- Le hook pre-commit met à jour automatiquement `src/assets/code.txt` avec le contenu actuel de `Game.tsx` pour le visualiseur de code in-game
- Le jeu est entièrement côté client sans dépendances backend
- Utilise Lodash pour les utilitaires de programmation fonctionnelle dans tout le codebase
- Husky est configuré pour les git hooks avec linting au pre-commit

## Workflow Git

Pour chaque demande de fonctionnalité ou évolution, créer une branche git dédiée avec un nom descriptif lié à la tâche. Cela permet des commits incrémentaux et une revue de code plus facile.

### Messages de commit - Conventional Commits

Le projet utilise **Conventional Commits** pour générer automatiquement les versions et changelogs avec semantic-release.

**Format** :
```
<type>(<scope optionnel>): <description>

[corps optionnel]

[notes optionnelles]
```

**Types disponibles** :
- `feat:` - Nouvelle fonctionnalité (→ bump MINOR, ex: 1.0.0 → 1.1.0)
- `fix:` - Correction de bug (→ bump PATCH, ex: 1.0.0 → 1.0.1)
- `perf:` - Amélioration de performance (→ bump PATCH)
- `docs:` - Documentation uniquement (pas de version)
- `style:` - Formatage, point-virgules, etc. (pas de version)
- `refactor:` - Refactoring du code (pas de version)
- `test:` - Ajout/modification de tests (pas de version)
- `build:` - Changements du système de build (pas de version)
- `ci:` - Changements CI/CD (pas de version)
- `chore:` - Maintenance générale (pas de version)
- `revert:` - Annulation d'un commit (→ bump PATCH)

**Breaking changes** :
Pour indiquer un changement majeur (→ bump MAJOR, ex: 1.0.0 → 2.0.0), ajouter `!` après le type ou `BREAKING CHANGE:` dans le footer :
```
feat!: refonte complète de l'interface utilisateur

BREAKING CHANGE: Les anciennes sauvegardes ne sont plus compatibles
```

**Exemples** :
```
feat: ajouter système de thèmes de couleur avec 5 thèmes
fix: corriger le nom de la propriété codeLines
docs: mettre à jour la documentation du système de sauvegarde
refactor(game): simplifier la logique de calcul des prix
perf: optimiser le rendu des composants avec React.memo
```

**Important** :
- Toujours écrire les messages en **français**
- Respecter le format pour que semantic-release fonctionne
- commitlint valide automatiquement les messages de commit
- Les commits sur main déclenchent automatiquement semantic-release

**Co-author** : Ne pas ajouter Claude en co-author dans les commits.

## Système de sauvegarde

⚠️ **IMPORTANT** : Lors de l'ajout de nouvelles fonctionnalités, il faut TOUJOURS mettre à jour le système de sauvegarde !

### Fichiers à modifier lors d'ajouts de fonctionnalités :

⚠️ **PROCÉDURE OBLIGATOIRE** : Toute évolution du jeu DOIT inclure la mise à jour du système de sauvegarde !

1. **`src/Game/GameContext.ts`** :

   - Ajouter les nouveaux champs au type `GameState` (les données)
   - Le type `SaveGame` s'adapte automatiquement (hérite de `GameState`)
   - Mettre à jour `gameStateDefaultValues` avec les nouvelles valeurs par défaut

2. **`src/Game/Game.tsx`** :

   - Adapter la fonction `loadSaveGame()` pour charger les nouvelles données
   - Mettre à jour la fonction `resetGame()` si nécessaire
   - Inclure les nouveaux champs dans `currentGameState`

3. **`src/Utils/SaveGame.ts`** :
   - Incrémenter `SAVE_VERSION` si changement incompatible
   - Ajouter logique de migration si nécessaire

### Système actuel

- **Architecture** : Séparation `GameState` (données) / `GameContext` (données + méthodes)
- **Sauvegarde automatique** : toutes les 10 secondes via `useTick` hook (pas via useEffect pour éviter les sauvegardes trop fréquentes)
- **Export/Import** : via Base64 avec validation de version
- **Réinitialisation** : remise aux valeurs par défaut + nettoyage localStorage
- **Interface** : mode paramètres accessible via bouton en en-tête
- **UX** : Le jeu continue de tourner pendant la gestion des sauvegardes

Voir `doc/Sauvegarde.md` pour la documentation complète du système.

## Fonctionnalités prévues

Voir `doc/Roadmap.md` pour la roadmap de développement actuelle. Les fonctionnalités manquantes clés incluent :

- ✅ Système de sauvegarde/chargement (implémenté)
- Cycles jour/nuit avec horaires de travail des employés
- Rôles auxiliaires (DevOps, CHO, Designer, etc.)
- Mécaniques de démission des employés

- n'essaie pas de lancer le serveur avec npm run dev, je m'occupe de lancer et tester le jeu
