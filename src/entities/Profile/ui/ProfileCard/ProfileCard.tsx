import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { memo } from 'react';
import { toNumberWithFallBack } from 'shared/lib/toNumberWithFallBack/toNumberWithFallBack';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Select } from 'shared/ui/Select/Select';
import { CurrencySelect } from 'entities/Currency';
import { CountrySelect } from 'entities/Country';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

interface ProfileCardProps {
    data: Profile
    className?: string;
    readOnly?: boolean
    onChange?: (value: Profile) => void;
}

type ProfileKeys = keyof Profile;

export const ProfileCard = memo((props: ProfileCardProps) => {
    const { t } = useTranslation('profile');
    const {
        className,
        data,
        readOnly,
        onChange,
    } = props;

    const onChangeCallBack = (value: unknown, key: ProfileKeys) => {
        onChange?.({
            [key]: value,
        });
    };

    return (
        <div className={classNames(cls.data, {}, [className])}>
            {
                data?.avatar && (
                    <div className={cls.avatarWrapper}>
                        <Avatar
                            src={data.avatar}
                            size={100}
                        />
                    </div>
                )
            }
            <Input
                label={t('username')}
                value={data.username}
                readOnly={readOnly}
                onChange={(value) => onChangeCallBack(value, 'username')}
            />
            <Input
                label={t('firstName')}
                value={data.first}
                readOnly={readOnly}
                onChange={(value) => onChangeCallBack(value, 'first')}
            />
            <Input
                label={t('lastName')}
                value={data.lastname}
                readOnly={readOnly}
                onChange={(value) => onChangeCallBack(value, 'lastname')}
            />

            <Input
                label={t('city')}
                value={data.city}
                readOnly={readOnly}
                onChange={(value) => onChangeCallBack(value, 'city')}
            />

            <Input
                label={t('age')}
                value={data.age}
                readOnly={readOnly}
                onChange={(value) => onChangeCallBack(toNumberWithFallBack(value, data.age), 'age')}
            />

            <Input
                label={t('avatar')}
                value={data.avatar}
                readOnly={readOnly}
                onChange={(value) => onChangeCallBack(value, 'avatar')}
            />

            <CurrencySelect
                value={data.currency}
                onChange={(value) => onChangeCallBack(value, 'currency')}
                readOnly={readOnly}
            />

            <CountrySelect
                value={data.country}
                onChange={(value) => onChangeCallBack(value, 'country')}
                readOnly={readOnly}
            />
        </div>
    );
});
