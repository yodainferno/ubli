import { fireEvent, screen } from '@testing-library/react';
import { renderWithTranslations }
    from 'shared/lib/tests/renderWithTranslation/renderWithTranslations';
import { SideBar } from './SideBar';

describe('SideBar', () => {
    test('renders correctly', () => {
        renderWithTranslations(<SideBar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('toggle works', () => {
        renderWithTranslations(<SideBar />);

        const toggleBtn = screen.getByTestId('sidebar-toggle');
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
