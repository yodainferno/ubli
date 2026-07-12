import { memo } from 'react';
import { EditableProfileCard } from 'features/EditableProfileCard';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => (
    <div className={classNames(cls.ProfilePage, {}, [className])}>
        <EditableProfileCard />
    </div>
));

export default ProfilePage;
