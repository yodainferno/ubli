import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Counter } from 'entities/Counter';
import { Page } from 'widgets/Page';

const MainPage = memo(() => {
    const { t } = useTranslation('main');
    return (
        <Page>
            {t('title')}
            <Counter />
        </Page>
    );
});

export default MainPage;
