import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>
interface InputProps extends HTMLInputProps {
    className?: string;
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder = '',
        label,
        autoFocus = false,
        ...otherProps
    } = props;

    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (autoFocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autoFocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const input = (
        <input
            ref={ref}
            type={type}
            value={value}
            onChange={onChangeHandler}
            placeholder={placeholder}
            className={cls.input}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...otherProps}
        />
    );

    return (
        <div className={classNames(cls.inputWrapper, {}, [className])}>
            {
                label ? (
                    // eslint-disable-next-line jsx-a11y/label-has-associated-control
                    <label className={cls.label}>
                        <span>{label}</span>
                        {input}
                    </label>
                ) : input
            }
        </div>
    );
});
