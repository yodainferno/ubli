import {classNames} from "shared/lib/classNames/classNames";
import cls from './NavBar.module.scss'
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";
import {ThemeSwitcher} from "widgets/ThemeSwitcher";

interface NavBarProps {
    className?: string;
}

export const NavBar = ({className}: NavBarProps) => {
    return (
        <div className={classNames(cls.NavBar, {}, [className])}>
            <div>
                NAME
            </div>
            <div className={cls.NavBarItems}>
                <AppLink to={'/'} theme={AppLinkTheme.INVERTED}>Главная</AppLink>
                <AppLink to={'/about'} theme={AppLinkTheme.INVERTED}>О нас</AppLink>
            </div>
        </div>
    );
};

