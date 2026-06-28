import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig';
import { useTranslation } from 'react-i18next';
import cls from './NavBar.module.scss';

interface NavBarProps {
  className?: string
}

export const NavBar = ({ className }: NavBarProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.NavBar, {}, [className])}>
            <div>
                {t('title')}
            </div>
            <div className={cls.NavBarItems}>
                <AppLink
                    to={RoutePath.main}
                    theme={AppLinkTheme.INVERTED}
                >
                    {t('main')}
                </AppLink>
                <AppLink
                    to={RoutePath.about}
                    theme={AppLinkTheme.INVERTED}
                >
                    {t('about')}
                </AppLink>
            </div>
        </div>
    );
};
