module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nouvelle fonctionnalité
        'fix',      // Correction de bug
        'docs',     // Documentation
        'style',    // Formatage, point-virgules manquants, etc.
        'refactor', // Refactoring du code
        'perf',     // Amélioration de performance
        'test',     // Ajout de tests
        'build',    // Changements du système de build
        'ci',       // Changements CI/CD
        'chore',    // Maintenance générale
        'revert',   // Annulation d'un commit précédent
      ],
    ],
    'subject-case': [0], // Permet n'importe quelle casse pour le sujet (français)
  },
};
