import { memo } from 'react';
import { EditableProfileCard } from 'features/EditableProfileCard';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => (
    <Page className={classNames(cls.ProfilePage, {}, [className])}>
        <EditableProfileCard />
    </Page>
));

export default ProfilePage;
