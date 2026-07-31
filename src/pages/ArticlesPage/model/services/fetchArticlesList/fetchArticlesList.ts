import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import {
    getArticlesLimit,
    getArticlesOrder, getArticlesPage,
    getArticlesSearch,
    getArticlesSort, getArticlesType,
} from 'pages/ArticlesPage/model/selectors/articles';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import { ArticleType } from 'entities/Article/model/types/article';

export interface FetchArticlesListProps {
    replace?: boolean;
}
export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps | undefined,
    ThunkConfig<string>
>(
    'ArticlesPage/fetchArticlesList',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        const page = getArticlesPage(getState());
        const limit = getArticlesLimit(getState());

        const order = getArticlesOrder(getState());
        const sort = getArticlesSort(getState());
        const search = getArticlesSearch(getState());
        const type = getArticlesType(getState());

        try {
            addQueryParams({
                sort, order, search, type,
            });

            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _page: page,
                    _limit: limit,
                    _sort: sort,
                    _order: order,
                    q: search,
                    type: type === ArticleType.ALL ? undefined : type,
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
