import { classNames } from 'shared/lib/classNames/classNames';

import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';

interface ThemeSwitcherProps {
  className?: string
}

export const LangSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };
    return (
        <Button
            className={classNames('', {}, [className])}
            onClick={toggle}
            theme={ThemeButton.CLEAR}
        >
            {t('translate')}
        </Button>
    );
};
