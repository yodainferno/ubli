import { memo, useCallback, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleView, ArticleViewSelector, ArticleSortSelector } from 'entities/Article';
import { articlePageSliceActions } from 'pages/ArticlesPage/model/slices/articlePageSlice';
import { useSelector } from 'react-redux';
import {
    getArticlesOrder,
    getArticlesSearch,
    getArticlesSort, getArticlesType,
    getArticlesView,
} from 'pages/ArticlesPage/model/selectors/articles';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import cls from './ArticlesPageFilter.module.scss';

interface ArticlesPageFilterProps {
    className?: string;
}

export const ArticlesPageFilter = memo(({ className }: ArticlesPageFilterProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const articlesView = useSelector(getArticlesView);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({
            replace: true,
        }));
    }, [dispatch]);

    const debounceFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageSliceActions.setView(view));
    }, [dispatch]);

    const order = useSelector(getArticlesOrder);
    const onChangeOrder = useCallback((value: SortOrder) => {
        dispatch(articlePageSliceActions.setOrder(value));
        dispatch(articlePageSliceActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const sort = useSelector(getArticlesSort);
    const onChangeSort = useCallback((value: ArticleSortField) => {
        dispatch(articlePageSliceActions.setSort(value));
        dispatch(articlePageSliceActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const search = useSelector(getArticlesSearch);
    const onChangeSearch = useCallback((value: string) => {
        dispatch(articlePageSliceActions.setSearch(value));
        dispatch(articlePageSliceActions.setPage(1));
        debounceFetchData();
    }, [dispatch, debounceFetchData]);

    const type = useSelector(getArticlesType);
    const onChangeType = useCallback((tab: TabItem) => {
        const value = tab.value as ArticleType;
        //
        dispatch(articlePageSliceActions.setType(value));
        dispatch(articlePageSliceActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const typeTabs = useMemo<TabItem[]>(() => [
        {
            value: ArticleType.ALL,
            content: 'Все  статьи',
        },
        {
            value: ArticleType.IT,
            content: 'IT',
        },
        {
            value: ArticleType.SCIENCE,
            content: 'Наука',
        },
        {
            value: ArticleType.ECONOMICS,
            content: 'Экономика',
        },
    ], []);

    return (
        <div className={classNames(cls.ArticlesPageFilter, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    order={order}
                    onChangeOrder={onChangeOrder}
                    sort={sort}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={articlesView ?? ArticleView.SMALL} onViewClick={onChangeView} />
            </div>
            <Card>
                <Input
                    value={search}
                    onChange={onChangeSearch}
                    placeholder="Поиск"
                />
            </Card>
            <Tabs
                tabs={typeTabs}
                value={type}
                onTabClick={onChangeType}
            />
        </div>
    );
});
