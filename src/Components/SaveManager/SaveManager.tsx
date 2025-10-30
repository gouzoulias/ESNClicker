import React, { useCallback, useContext, useRef, useState } from 'react';
import styles from './SaveManager.module.scss';
import { gameContext } from '../Game/GameContext';
import { clearSaveGame, createSaveGame, exportSaveGame, importSaveGame, saveGameToLocalStorage } from '../Utils/SaveGame';

export const SaveManager = () => {
  const game = useContext(gameContext);
  const [exportData, setExportData] = useState<string>('');
  const [importData, setImportData] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = useCallback(() => {
    const saveGame = createSaveGame(game);
    const exportedData = exportSaveGame(saveGame);
    setExportData(exportedData);
    setMessage('Sauvegarde exportée avec succès !');
  }, [game]);

  const handleImport = useCallback(() => {
    if (!importData.trim()) {
      setMessage('Veuillez entrer des données de sauvegarde');
      return;
    }

    const saveGame = importSaveGame(importData.trim());
    if (saveGame) {
      game.loadSaveGame(saveGame);
      saveGameToLocalStorage(saveGame);
      setMessage('Sauvegarde importée avec succès !');
      setImportData('');
    } else {
      setMessage('Erreur: données de sauvegarde invalides');
    }
  }, [importData, game]);

  const handleDownload = useCallback(() => {
    if (!exportData) return;

    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `esn-clicker-save-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setMessage('Fichier téléchargé !');
  }, [exportData]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setImportData(content);
        setMessage('Fichier chargé, cliquez sur "Importer" pour l\'appliquer');
      };
      reader.readAsText(file);
    }
  }, []);

  const handleReset = useCallback(() => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser votre progression ? Cette action est irréversible !')) {
      game.resetGame();
      clearSaveGame();
      setMessage('Jeu réinitialisé !');
      setExportData('');
      setImportData('');
    }
  }, [game]);

  const copyToClipboard = useCallback(() => {
    if (exportData && navigator.clipboard) {
      navigator.clipboard.writeText(exportData).then(() => {
        setMessage('Copié dans le presse-papier !');
      });
    }
  }, [exportData]);

  return (
    <div className={styles.container}>
      <h3>Gestion des sauvegardes</h3>

      {message && <div className={`${styles.message} ${message.includes('Erreur') ? styles.error : styles.success}`}>{message}</div>}

      <div className={styles.section}>
        <h4>Exporter la sauvegarde</h4>
        <button onClick={handleExport} className={styles.button}>
          Générer l'export
        </button>
        {exportData && (
          <>
            <button onClick={handleDownload} className={styles.button}>
              Télécharger le fichier
            </button>
            <button onClick={copyToClipboard}>Copier</button>
            <textarea value={exportData} readOnly className={styles.textarea} placeholder="Les données d'export apparaîtront ici..." />
          </>
        )}
      </div>

      <div className={styles.section}>
        <h4>Importer une sauvegarde</h4>
        <div>
          <input type="file" accept=".txt" onChange={handleFileUpload} ref={fileInputRef} className={styles.fileInput} />
          <button onClick={() => fileInputRef.current?.click()}>Choisir un fichier</button>
        </div>
        <textarea
          value={importData}
          onChange={(e) => setImportData(e.target.value)}
          placeholder="Ou collez ici vos données de sauvegarde..."
          className={styles.textareaImport}
        />
        <button onClick={handleImport} disabled={!importData.trim()}>
          Importer
        </button>
      </div>

      <div className={styles.dangerZone}>
        <h4>Zone dangereuse</h4>
        <button onClick={handleReset} className={styles.resetButton}>
          Réinitialiser le jeu
        </button>
      </div>
    </div>
  );
};
