import { useContext } from 'react';
import { gameContext } from '@game/GameContext';
import styles from './ThemeSelector.module.scss';

const THEMES = [
  { id: 'light', label: 'Clair', icon: '☀️' },
  { id: 'dark', label: 'Sombre', icon: '🌙' },
  { id: 'matrix', label: 'Matrix', icon: '💻' },
  { id: 'cyberpunk', label: 'Cyberpunk', icon: '🌃' },
  { id: 'corporate', label: 'Corporate', icon: '🏢' },
];

export const ThemeSelector = () => {
  const game = useContext(gameContext);

  const handleThemeChange = (themeId: string) => {
    game.setTheme(themeId);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Thème :</label>
      <div className={styles.themeButtons}>
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            className={`${styles.themeButton} ${game.theme === theme.id ? styles.active : ''}`}
            onClick={() => handleThemeChange(theme.id)}
            title={theme.label}
          >
            <span className={styles.icon}>{theme.icon}</span>
            <span className={styles.name}>{theme.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
