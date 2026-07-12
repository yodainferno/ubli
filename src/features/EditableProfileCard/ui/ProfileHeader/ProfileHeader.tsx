import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProfileReadOnly } from 'features/EditableProfileCard/model/selectors/getProfileReadOnly/getProfileReadOnly';
import { useCallback } from 'react';
import { profileActions } from 'features/EditableProfileCard/model/slice/profileSlice';
import { updateProfileData } from 'features/EditableProfileCard/model/services/updateProfileData/updateProfileData';
import cls from './ProfileHeader.module.scss';

interface ProfileHeaderProps {
    className?: string;
}

export const ProfileHeader = (props: ProfileHeaderProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('profile');

    const dispatch = useAppDispatch();
    const readOnly = useSelector(getProfileReadOnly);

    const onEdit = useCallback(() => {
        dispatch(profileActions.onEdit());
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <div className={classNames(cls.header, {}, [className])}>
            <Text
                className={cls.title}
                title={t('title')}
            />
            {
                readOnly ? (
                    <Button
                        theme={ButtonTheme.OUTLINE}
                        onClick={onEdit}
                    >
                        {t('edit')}
                    </Button>
                ) : (
                    <>
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onCancelEdit}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            theme={ButtonTheme.BACKGROUND}
                            onClick={onSave}
                        >
                            {t('save')}
                        </Button>
                    </>
                )
            }
        </div>
    );
};
