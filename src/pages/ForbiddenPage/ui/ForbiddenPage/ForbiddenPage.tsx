import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page/Page';
import cls from './ForbiddenPage.module.scss';

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = memo((props: ForbiddenPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Page className={classNames(cls.ForbiddenPage, {}, [className])}>
            <Text
                title="Эта страница вам недоступна"
                text="Для просмотра этой страницы нужна другая роль"
            />
            <AppLink to={RoutePath.main}>На главную</AppLink>

        </Page>
    );
});

export default ForbiddenPage;
