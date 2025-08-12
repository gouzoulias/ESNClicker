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

### Type SaveGame

```typescript
export type SaveGame = {
  version: number;                    // Version du format de sauvegarde
  timestamp: number;                  // Timestamp de création
  codeLines: number;                 // Lignes de code actuelles
  totalCodeLinesAccumulated: number; // Total de lignes créées
  money: number;                     // Argent actuel
  totalMoneyAccumulated: number;     // Total d'argent gagné
  boughtUpgrade: Record<Upgrade, boolean>;           // Upgrades achetés
  activatedUpgrades: Record<Upgrade, { devs: Record<Dev, boolean>; pos: Record<PO, boolean> }>;
  codePrice: number;                 // Prix de vente du code
  manualProductivity: number;        // Productivité manuelle
  manualSellingForce: number;        // Force de vente manuelle
  devTeamInfo: Record<Dev, ProductionItemInfo>;     // Info équipe dev
  poTeamInfo: Record<PO, ProductionItemInfo>;       // Info équipe PO
  unlockedAux: Record<Aux, boolean>; // Auxiliaires débloqués
  auxTeam: Record<Aux, number>;      // Nombre d'auxiliaires
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

1. **Sauvegarde** : Automatique, rien à faire
2. **Export** : Cliquer sur "Générer l'export" puis copier ou télécharger
3. **Import** : Coller les données ou uploader un fichier, puis cliquer "Importer"
4. **Reset** : Cliquer "Réinitialiser" et confirmer

### Pour les développeurs

Lors de l'ajout de nouvelles fonctionnalités :

1. **Mettre à jour le type SaveGame** dans `SaveGame.ts`
2. **Modifier createSaveGame()** pour inclure les nouvelles données
3. **Adapter loadSaveGame()** dans Game.tsx
4. **Incrémenter SAVE_VERSION** si nécessaire
5. **Ajouter logique de migration** si nécessaire
6. **Mettre à jour les valeurs par défaut** dans GameContext.ts

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