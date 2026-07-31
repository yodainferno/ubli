import { StateSchema } from 'app/providers/StoreProvider';
import { ResponseStatus } from 'shared/api/types/apiResponse';
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/article';

export const getArticlesLoading = (state: StateSchema) => {
    const type = state.articlesPage?.data?.type ?? ResponseStatus.IDLE;
    return (type === ResponseStatus.LOADING || type === ResponseStatus.IDLE);
};
export const getArticlesView = (state: StateSchema) => state.articlesPage?.view;

export const getArticlesPage = (state: StateSchema) => state.articlesPage?.page ?? 1;
export const getArticlesLimit = (state: StateSchema) => state.articlesPage?.limit ?? 3;
export const getArticlesHasMore = (state: StateSchema) => state.articlesPage?.hasMore ?? true;
export const getArticlesInited = (state: StateSchema) => state.articlesPage?._inited ?? false;

export const getArticlesOrder = (state: StateSchema) => state.articlesPage?.order ?? 'desc';
export const getArticlesSort = (state: StateSchema) => state.articlesPage?.sort ?? ArticleSortField.CREATED;
export const getArticlesSearch = (state: StateSchema) => state.articlesPage?.search ?? '';
export const getArticlesType = (state: StateSchema) => state.articlesPage?.type ?? ArticleType.ALL;
