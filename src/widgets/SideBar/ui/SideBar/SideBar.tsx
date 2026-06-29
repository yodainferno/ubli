import { classNames } from 'shared/lib/classNames/classNames';
import { useState } from 'react';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { useTranslation } from 'react-i18next';
import cls from './SideBar.module.scss';

interface SideBarProps {
  className?: string
}

export const SideBar = ({ className }: SideBarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();

    const onToggle = async () => {
        setCollapsed((prev) => !prev);
    };
    return (
        <div
            className={classNames(cls.SideBar, {
                [cls.collapsed]: collapsed,
            }, [className])}
            data-testid="sidebar"
        >

            <button
                data-testid="sidebar-toggle"
                type="button"
                onClick={onToggle}
            >
                {t('toggle')}
            </button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>
        </div>
    );
};
