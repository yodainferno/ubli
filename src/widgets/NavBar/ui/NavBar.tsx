import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import cls from './NavBar.module.scss';

interface NavBarProps {
  className?: string
}

export const NavBar = ({ className }: NavBarProps) => (
    <div className={classNames(cls.NavBar, {}, [className])}>
        <div>
            NAME
        </div>
        <div className={cls.NavBarItems}>
            <AppLink to="/" theme={AppLinkTheme.INVERTED}>Главная</AppLink>
            <AppLink to="/about" theme={AppLinkTheme.INVERTED}>О нас</AppLink>
        </div>
    </div>
);
