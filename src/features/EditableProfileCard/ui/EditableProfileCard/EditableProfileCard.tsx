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
import { ValidateProfileError } from 'features/EditableProfileCard/model/types/profile';
import cls from './EditableProfileCard.module.scss';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import {
    getProfileValidateErrors,
} from '../../model/selectors/getProfileValidateErrors/getProfileValidateError';

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
    const profileValidateErrors = useSelector(getProfileValidateErrors);

    const { t } = useTranslation('profile');

    const readOnly = useSelector(getProfileReadOnly);

    const onChange = useCallback((value: Profile) => {
        dispatch(profileActions.setForm(value));
    }, [dispatch]);

    const validateErrorTranslations = useMemo(() => ({
        [ValidateProfileError.INCORRECT_COUNTRY]: t('INCORRECT_COUNTRY'),
        [ValidateProfileError.INCORRECT_AGE]: t('INCORRECT_AGE'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('INCORRECT_USER_DATA'),
        [ValidateProfileError.INCORRECT_AUTH_DATA]: t('INCORRECT_AUTH_DATA'),
        [ValidateProfileError.NO_DATA]: t('NO_DATA'),
    }), [t]);

    const cardData = useMemo(() => {
        if (!profileData) return null;

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
                    {
                        profileValidateErrors.length > 0 && !readOnly && (
                            profileValidateErrors.map((error) => (
                                <Text theme={TextTheme.ERROR} text={validateErrorTranslations[error]} key={error} />
                            ))
                        )
                    }
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
    }, [onChange, profileData, profileForm, profileValidateErrors, readOnly, t, validateErrorTranslations]);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchProfileData());
        }
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.EditableProfileCard, {}, [className])}>
                {cardData}
            </div>
        </DynamicModuleLoader>
    );
};
