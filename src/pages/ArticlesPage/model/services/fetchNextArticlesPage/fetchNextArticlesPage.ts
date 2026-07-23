import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    getArticlesHasMore,
    getArticlesLoading,
    getArticlesPage,
} from '../../selectors/articles';
import { articlePageSliceActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'ArticlesPage/fetchNextArticlesPage',
    async (_, thunkApi) => {
        const {
            getState, dispatch,
        } = thunkApi;
        const hasMore = getArticlesHasMore(getState());
        const page = getArticlesPage(getState());
        const isLoading = getArticlesLoading(getState());

        if (isLoading || !hasMore) return;

        dispatch(articlePageSliceActions.setPage(page + 1));
        dispatch(fetchArticlesList({
            page: page + 1,
        }));
    },
);
