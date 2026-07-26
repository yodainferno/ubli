import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { getArticlesInited } from '../../selectors/articles';
import { articlePageSliceActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'ArticlesPage/initArticlesPage',
    async (_, thunkApi) => {
        const { dispatch, getState } = thunkApi;

        const articlesInited = getArticlesInited(getState());

        if (!articlesInited) {
            dispatch(articlePageSliceActions.initState());
            dispatch(fetchArticlesList({
                page: 1,
            }));
        }
    },
);
