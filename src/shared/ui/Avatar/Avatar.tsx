import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
import cls from './Avatar.module.scss';

interface AvatarProps {
    src: string;
    size?: number
    alt?: string
    className?: string;
}

export const Avatar = (props: AvatarProps) => {
    const {
        src,
        size = 48,
        alt = '',
        className,
    } = props;

    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(() => ({
        width: size,
        height: size,
    }), [size]);

    return (
        <img
            src={src}
            style={styles}
            alt={alt}
            className={classNames(cls.Avatar, {}, [className])}
        />
    );
};
