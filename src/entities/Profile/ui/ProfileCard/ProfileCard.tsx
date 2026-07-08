import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { ResponseStatus } from 'shared/api/types/apiResponse';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
    const { t } = useTranslation();

    const profileData = useSelector(getProfileData);

    if (profileData.type === ResponseStatus.ERROR) {
        return (
            <Text
                title={t('error')}
                theme={TextTheme.ERROR}
            />
        );
    }
    if (profileData.type === ResponseStatus.SUCCESS) {
        const data = profileData.payload!;
        return (
            <div className={classNames(cls.ProfileCard, {}, [className])}>
                <div className={cls.header}>
                    <Text
                        title={t('title', { ns: 'profile' })}
                    />
                    <Button theme={ButtonTheme.OUTLINE}>
                        {t('edit', { ns: 'profile' })}
                    </Button>
                </div>
                <div className={cls.data}>
                    <Input
                        label={t('edit', { ns: 'username' })}
                        value={data.username}
                        readOnly
                    />
                    <Input
                        label={t('edit', { ns: 'first' })}
                        value={data.first}
                        readOnly
                    />
                    <Input
                        label={t('edit', { ns: 'lastname' })}
                        value={data.lastname}
                        readOnly
                    />

                </div>
            </div>
        );
    }

    // ResponseStatus.LOADING
    // ResponseStatus.IDLE
    return (
        <Loader />
    );
};
