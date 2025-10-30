# Système de Sauvegarde - ESN Clicker

## Vue d'ensemble

Le système de sauvegarde d'ESN Clicker permet aux joueurs de :

- Sauvegarder automatiquement leur progression dans le navigateur
- Exporter leur sauvegarde vers un fichier ou du texte
- Importer une sauvegarde depuis un fichier ou du texte
- Réinitialiser complètement leur progression

## Architecture

### Fichiers principaux

- `src/Utils/SaveGame.ts` : Types et utilitaires de sauvegarde
- `src/Components/SaveManager.tsx` : Interface utilisateur de gestion des sauvegardes
- `src/Game/Game.tsx` : Intégration de la sauvegarde automatique et des fonctions de chargement

### Types GameState et SaveGame

L'architecture repose sur la séparation claire entre l'état du jeu et le contexte :

```typescript
// État pur du jeu (sans méthodes)
export type GameState = {
  codeLines: number;
  totalCodeLinesAccumulated: number;
  money: number;
  totalMoneyAccumulated: number;
  boughtUpgrade: Record<Upgrade, boolean>;
  activatedUpgrades: Record<Upgrade, { devs: Record<Dev, boolean>; pos: Record<PO, boolean> }>;
  codePrice: number;
  manualProductivity: number;
  manualSellingForce: number;
  devTeamInfo: Record<Dev, ProductionItemInfo>;
  poTeamInfo: Record<PO, ProductionItemInfo>;
  unlockedAux: Record<Aux, boolean>;
  auxTeam: Record<Aux, number>;
};

// Contexte = État + méthodes
export type GameContext = GameState & {
  createManualLine: (numberOfLinesToCreate: number) => void;
  buyDev: (dev: Dev) => void;
  // ... autres méthodes
};

// Sauvegarde = État + métadonnées
export type SaveGame = GameState & {
  version: number;
  timestamp: number;
};
```

## Fonctionnalités

### 1. Sauvegarde automatique

- **Fréquence** : Toutes les 10 secondes
- **Stockage** : localStorage du navigateur
- **Clé** : `esn-clicker-save`
- **Chargement** : Au démarrage de l'application

### 2. Export de sauvegarde

- **Format** : Base64 encodé du JSON
- **Méthodes** :
  - Affichage dans une textarea pour copie manuelle
  - Copie automatique dans le presse-papier
  - Téléchargement d'un fichier `.txt`

### 3. Import de sauvegarde

- **Sources** :
  - Saisie manuelle dans une textarea
  - Upload d'un fichier `.txt`
- **Validation** :
  - Vérification du format Base64
  - Validation de la structure JSON
  - Contrôle de version

### 4. Réinitialisation

- **Action** : Restauration des valeurs par défaut
- **Confirmation** : Dialog de confirmation obligatoire
- **Nettoyage** : Suppression de la sauvegarde localStorage

## Gestion des versions

### Version actuelle : 1

- **Compatibilité** : Les sauvegardes d'une version différente sont rejetées
- **Migration** : Prête pour l'ajout de logique de migration future
- **Logs** : Warnings en console pour les incompatibilités

## Interface utilisateur

### Composant SaveManager

Interface accessible via le bouton "Paramètres" dans l'en-tête du jeu.

**Mode paramètres** :

- Masque l'interface de jeu principale
- Affiche un avertissement que le jeu continue en arrière-plan
- Bouton "Retour au jeu" pour revenir à l'interface normale

Organisé en 3 sections :

1. **Export** :

   - Bouton "Générer l'export"
   - Textarea avec données exportées
   - Boutons "Télécharger" et "Copier"

2. **Import** :

   - Upload de fichier
   - Textarea pour saisie manuelle
   - Bouton "Importer"

3. **Zone dangereuse** :
   - Bouton "Réinitialiser" avec style d'avertissement

## Erreurs et validation

### Messages d'erreur

- Format de sauvegarde invalide
- Version incompatible
- Données manquantes
- Erreur de lecture/écriture localStorage

### Validation

- Vérification Base64
- Structure JSON valide
- Présence des champs obligatoires
- Cohérence des types

## Intégration

### Dans GameContext

Nouvelles fonctions ajoutées :

- `loadSaveGame(saveGame: SaveGame) => void`
- `resetGame() => void`

### Dans Game.tsx

- `useEffect` pour chargement initial
- `useEffect` pour sauvegarde automatique
- Fonctions de chargement et reset

## Utilisation

### Pour les joueurs

1. **Accès** : Cliquer sur "Paramètres" dans l'en-tête
2. **Sauvegarde** : Automatique, rien à faire
3. **Export** : Cliquer sur "Générer l'export" puis copier ou télécharger
4. **Import** : Coller les données ou uploader un fichier, puis cliquer "Importer"
5. **Reset** : Cliquer "Réinitialiser" et confirmer
6. **Retour** : Cliquer "Retour au jeu" pour revenir à l'interface normale

### Pour les développeurs

⚠️ **IMPORTANT** : Lors de l'ajout de nouvelles fonctionnalités, il faut TOUJOURS mettre à jour le système de sauvegarde !

1. **Mettre à jour le type GameState** dans `GameContext.ts`
2. **Le type SaveGame s'adapte automatiquement** (hérite de GameState)
3. **Adapter loadSaveGame()** dans Game.tsx pour les nouveaux champs
4. **Mettre à jour resetGame()** dans Game.tsx si nécessaire
5. **Mettre à jour gameStateDefaultValues** dans GameContext.ts
6. **Incrémenter SAVE_VERSION** si changement incompatible
7. **Ajouter logique de migration** si nécessaire

## Sécurité

- **Validation** : Toutes les données importées sont validées
- **Sandbox** : Pas d'exécution de code depuis les sauvegardes
- **Base64** : Protection basique contre la manipulation accidentelle
- **Confirmation** : Dialog de confirmation pour la réinitialisation

## Performance

- **Compression** : JSON minifié + Base64
- **Fréquence** : Sauvegarde toutes les 10s (ajustable)
- **Mémoire** : Structure optimisée pour la sérialisation
- **Cleanup** : Pas d'historique, seule la dernière sauvegarde est conservée
