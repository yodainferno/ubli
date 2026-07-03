import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal/Modal';
import React, { useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './NavBar.module.scss';

interface NavBarProps {
  className?: string
}

export const NavBar = ({ className }: NavBarProps) => {
    const { t } = useTranslation();

    const [isAuthModal, setIsAuthModal] = useState(false);
    const onToggleAuthModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    return (
        <div className={classNames(cls.NavBar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onToggleAuthModal}
            >
                {t('signIn')}
            </Button>
            <Modal
                isOpen={isAuthModal}
                onClose={onToggleAuthModal}
            >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque beatae consequuntur error esse, exercitationem facere fugit iste nobis nostrum numquam porro repudiandae, saepe similique soluta tempora tempore ut veniam. Soluta.
            </Modal>
        </div>
    );
};
