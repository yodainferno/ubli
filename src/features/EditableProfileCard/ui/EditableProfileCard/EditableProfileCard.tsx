import { useTranslation } from 'react-i18next';
import type { Profile } from 'entities/Profile';
import { ProfileCard } from 'entities/Profile';
import { useSelector } from 'react-redux';
import { ResponseStatus } from 'shared/api/types/apiResponse';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Loader } from 'shared/ui/Loader/Loader';
import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ProfileHeader } from 'features/EditableProfileCard/ui/ProfileHeader/ProfileHeader';
import { classNames } from 'shared/lib/classNames/classNames';
import { getProfileReadOnly } from 'features/EditableProfileCard/model/selectors/getProfileReadOnly/getProfileReadOnly';
import { getProfileForm } from 'features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';
import cls from './EditableProfileCard.module.scss';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';

interface EditableProfileCardProps {
    className?: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

export const EditableProfileCard = ({ className }: EditableProfileCardProps) => {
    const dispatch = useAppDispatch();
    const profileData = useSelector(getProfileData);
    const profileForm = useSelector(getProfileForm);

    const { t } = useTranslation('profile');

    const readOnly = useSelector(getProfileReadOnly);

    const onChange = useCallback((value: Profile) => {
        dispatch(profileActions.setForm(value));
    }, [dispatch]);

    const cardData = useMemo(() => {
        if (profileData.type === ResponseStatus.ERROR) {
            return (
                <div className={classNames(cls.errorBlock, {}, [cls.ProfileCard])}>
                    <Text
                        title={t('loadErrorTitle')}
                        text={t('loadErrorText')}
                        theme={TextTheme.ERROR}
                        align={TextAlign.CENTER}
                    />
                </div>

            );
        }
        if (profileData.type === ResponseStatus.SUCCESS) {
            const formData = readOnly ? profileData!.payload! : profileForm!;

            return (
                <div>
                    <ProfileHeader className={cls.header} />
                    <ProfileCard
                        data={formData}
                        className={cls.ProfileCard}
                        readOnly={readOnly}
                        onChange={onChange}
                    />
                </div>
            );
        }

        // ResponseStatus.LOADING
        // ResponseStatus.IDLE
        return (
            <div className={classNames(cls.loading, {}, [cls.ProfileCard])}>
                <Loader />
            </div>
        );
    }, [onChange, profileData, profileForm, readOnly, t]);

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.EditableProfileCard, {}, [className])}>
                {cardData}
            </div>
        </DynamicModuleLoader>
    );
};
