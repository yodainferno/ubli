import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
  toggleTheme: () => void
  theme: Theme
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);
    const currentTheme = theme ?? Theme.LIGHT;

    const toggleTheme = () => {
        let newTheme: Theme;

        switch (currentTheme) {
        case Theme.LIGHT:
            newTheme = Theme.DARK; break;
        case Theme.DARK:
            newTheme = Theme.ORANGE; break;
        case Theme.ORANGE:
            newTheme = Theme.LIGHT; break;
        default:
            newTheme = Theme.LIGHT;
        }

        if (setTheme === undefined) {
            throw new Error('useTheme must be used within ThemeProvider');
        }
        setTheme(newTheme);
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        toggleTheme,
        theme: currentTheme,
    };
}
