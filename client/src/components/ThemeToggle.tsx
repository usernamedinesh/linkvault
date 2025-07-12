import './theme.css';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="toggle-container">
      {/* left icon — choose any FA icon you like */}
      <i className="fa-solid fa-gear icon-eq" />

      <label className="switch">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          aria-label="Toggle theme"
        />
        <span className="slider round"></span>
      </label>

      {/* right icon */}
      <i className="fa-solid fa-moon icon-eq" />
    </div>
  );
}

