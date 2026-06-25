import {classNames} from "shared/lib/classNames/classNames";
import cls from './NavBar.module.scss'
import {useTheme} from "app/providers/ThemeProvider";
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";

interface NavBarProps {
    className?: string;
}

export const NavBar = ({className}: NavBarProps) => {
    const {toggleTheme} = useTheme();

    return (
        <div className={classNames(cls.NavBar, {}, [className])}>
            <div>
                NAME
            </div>
            <div className={cls.NavBarItems}>
                <AppLink to={'/'} theme={AppLinkTheme.INVERTED}>Главная</AppLink>
                <AppLink to={'/about'} theme={AppLinkTheme.INVERTED}>О нас</AppLink>
            </div>
            <button onClick={toggleTheme}>TOGGLE THEME</button>
        </div>
    );
};

