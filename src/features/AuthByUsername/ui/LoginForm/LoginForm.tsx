import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useState } from 'react';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation('signin');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input
                label={t('username')}
                value={username}
                onChange={(value: string) => setUsername(value)}
                autoFocus
            />
            <Input
                label={t('password')}
                type="password"
                value={password}
                onChange={(value: string) => setPassword(value)}
            />
            <Button className={cls.button}>
                {t('submit')}
            </Button>
        </div>
    );
};
