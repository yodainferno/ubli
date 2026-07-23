import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { useSelector } from 'react-redux';
import { getArticlesLoading, getArticlesView } from 'pages/ArticlesPage/model/selectors/articles';
import { ArticleView, ArticleViewSelector } from 'entities/Article';
import cls from './ArticlesPage.module.scss';
import { articlePageSliceActions, articlePageSliceReducer, getArticles } from '../../model/slices/articlePageSlice';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlePageSliceReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();

    const articles = useSelector(getArticles.selectAll);
    const articlesLoading = useSelector(getArticlesLoading);
    const articlesView = useSelector(getArticlesView);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageSliceActions.setView(view));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchArticlesList());
        dispatch(articlePageSliceActions.initState());
    });

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticleViewSelector view={articlesView ?? ArticleView.SMALL} onViewClick={onChangeView} />
                <ArticleList
                    isLoading={articlesLoading}
                    view={articlesView}
                    articles={articles}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
