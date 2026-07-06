import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseStatus } from 'shared/api/types/apiResponse';
import i18n from 'shared/config/i18n/i18n';
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginActions } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation('signin');
    const dispatch = useDispatch();
    const { username, password, status } = useSelector(getLoginState);

    const onChangeUserName = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onSubmitClick = useCallback(() => {
        dispatch(loginByUserName({ username, password }));
    }, [dispatch, username, password]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('title')} />

            {status.type === ResponseStatus.ERROR && (
                <Text
                    title="!!!"
                    text={t('error')}
                    theme={TextTheme.ERROR}
                />
            )}
            <Input
                label={t('username')}
                value={username}
                onChange={onChangeUserName}
                autoFocus
            />
            <Input
                label={t('password')}
                type="password"
                value={password}
                onChange={onChangePassword}
            />
            <Button
                className={cls.button}
                onClick={onSubmitClick}
                disabled={status.type === ResponseStatus.LOADING}
            >
                {t('submit')}
            </Button>
        </div>
    );
});
