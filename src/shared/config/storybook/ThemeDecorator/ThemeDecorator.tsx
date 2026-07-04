import { Story } from '@storybook/react';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => {
    document.body.classList.remove(Theme.LIGHT, Theme.DARK);
    document.body.classList.add(theme);

    return (
        <ThemeProvider initialTheme={theme}>
            <div className="app">
                <StoryComponent />
            </div>
        </ThemeProvider>
    );
};
