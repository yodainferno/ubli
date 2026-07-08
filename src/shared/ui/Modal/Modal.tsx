import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { Portal } from 'shared/ui/Portal/Portal';
import { useTheme } from 'app/providers/ThemeProvider';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean
}

const CLOSE_ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen = false,
        onClose,
        lazy = true,
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const closeHandler = useCallback(() => {
        if (!onClose) return;

        setIsClosing(true);
        timerRef.current = setTimeout(() => { // todo - почему занесли в ref?
            onClose();
            setIsClosing(false);
        }, CLOSE_ANIMATION_DELAY);
    }, [onClose]);

    // каждый перерендер = новая функция и новая ссылка!!!
    // const onKeyDown = (e: KeyboardEvent) => { ... };

    // поэтому делаем useCallback
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(
        () => {
            if (isOpen) window.addEventListener('keydown', onKeyDown);

            return () => { // выполняется при размонтировании компонента
                if (timerRef.current) clearTimeout(timerRef.current);
                window.removeEventListener('keydown', onKeyDown);
            };
        },
        [isOpen, onKeyDown],
    );

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const contentClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }
    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, ['app_modal', className])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={contentClickHandler}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
