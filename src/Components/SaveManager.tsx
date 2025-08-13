import React, { useCallback, useContext, useRef, useState } from 'react';
import { gameContext } from '../Game/GameContext.ts';
import { clearSaveGame, createSaveGame, exportSaveGame, importSaveGame, saveGameToLocalStorage } from '../Utils/SaveGame.ts';

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
    <div
      style={{
        border: '1px solid #ccc',
        padding: '15px',
        margin: '10px',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h3>Gestion des sauvegardes</h3>

      {message && (
        <div
          style={{
            padding: '8px',
            marginBottom: '10px',
            backgroundColor: message.includes('Erreur') ? '#ffebee' : '#e8f5e8',
            color: message.includes('Erreur') ? '#c62828' : '#2e7d32',
            borderRadius: '3px',
          }}
        >
          {message}
        </div>
      )}

      <div style={{ marginBottom: '15px' }}>
        <h4>Exporter la sauvegarde</h4>
        <button onClick={handleExport} style={{ marginRight: '10px' }}>
          Générer l'export
        </button>
        {exportData && (
          <>
            <button onClick={handleDownload} style={{ marginRight: '10px' }}>
              Télécharger le fichier
            </button>
            <button onClick={copyToClipboard}>Copier</button>
            <div style={{ marginTop: '10px' }}>
              <textarea
                value={exportData}
                readOnly
                style={{ width: '100%', height: '60px', resize: 'vertical' }}
                placeholder="Les données d'export apparaîtront ici..."
              />
            </div>
          </>
        )}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4>Importer une sauvegarde</h4>
        <div style={{ marginBottom: '10px' }}>
          <input type="file" accept=".txt" onChange={handleFileUpload} ref={fileInputRef} style={{ marginRight: '10px' }} />
          <button onClick={() => fileInputRef.current?.click()}>Choisir un fichier</button>
        </div>
        <textarea
          value={importData}
          onChange={(e) => setImportData(e.target.value)}
          placeholder="Ou collez ici vos données de sauvegarde..."
          style={{ width: '100%', height: '60px', marginBottom: '10px', resize: 'vertical' }}
        />
        <button onClick={handleImport} disabled={!importData.trim()}>
          Importer
        </button>
      </div>

      <div style={{ borderTop: '1px solid #ddd', paddingTop: '15px' }}>
        <h4 style={{ color: '#d32f2f' }}>Zone dangereuse</h4>
        <button
          onClick={handleReset}
          style={{
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '3px',
            cursor: 'pointer',
          }}
        >
          Réinitialiser le jeu
        </button>
      </div>
    </div>
  );
};
