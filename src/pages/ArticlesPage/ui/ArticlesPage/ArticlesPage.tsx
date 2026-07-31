import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Page } from 'widgets/Page';
import { ArticlesPageFilter } from 'pages/ArticlesPage/ui/ArticlesPageFilter/ArticlesPageFilter';
import {
    getArticlesLoading,
    getArticlesView,
} from '../../model/selectors/articles';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import cls from './ArticlesPage.module.scss';
import { articlePageSliceReducer, getArticles } from '../../model/slices/articlePageSlice';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlePageSliceReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch();

    const articles = useSelector(getArticles.selectAll);
    const articlesLoading = useSelector(getArticlesLoading);
    const articlesView = useSelector(getArticlesView);

    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} keepAfterUnmount>
            <Page
                className={classNames(cls.ArticlesPage, {}, [className])}
                onScrollEnd={onLoadNextPart}
            >
                <ArticlesPageFilter />
                <ArticleList
                    isLoading={articlesLoading}
                    view={articlesView}
                    articles={articles}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
