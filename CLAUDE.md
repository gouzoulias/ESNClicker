# CLAUDE.md

Ce fichier fournit des orientations à Claude Code (claude.ai/code) lors du travail sur ce repository.

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

- `src/App.tsx` - Layout UI principal avec deux colonnes (Production de Code | Vente de Code) + Upgrades
- `src/Game/Game.tsx` - Gestion d'état centralisée et logique de jeu
- `src/Components/` - Composants UI pour les différentes sections du jeu
- `src/Game/` - Entités de jeu, types, et logique métier

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

**Messages de commit** : Toujours écrire les messages de commit en français pour rester cohérent avec le projet.

**Co-author** : Ne pas ajouter Claude en co-author dans les commits.

## Fonctionnalités prévues

Voir `doc/Roadmap.md` pour la roadmap de développement actuelle. Les fonctionnalités manquantes clés incluent :

- Système de sauvegarde/chargement
- Cycles jour/nuit avec horaires de travail des employés
- Rôles auxiliaires (DevOps, CHO, Designer, etc.)
- Mécaniques de démission des employés
