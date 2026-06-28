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
        const newTheme: Theme = currentTheme === Theme.DARK
            ? Theme.LIGHT
            : Theme.DARK;
        if (setTheme === undefined) {
            throw new Error('useTheme must be used within ThemeProvider');
        }
        setTheme(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        toggleTheme,
        theme: currentTheme,
    };
}
