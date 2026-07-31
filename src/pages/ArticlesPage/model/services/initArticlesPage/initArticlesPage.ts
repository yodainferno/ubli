import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { getArticlesInited } from '../../selectors/articles';
import { articlePageSliceActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    'ArticlesPage/initArticlesPage',
    async (searchParams, thunkApi) => {
        const { dispatch, getState } = thunkApi;

        const articlesInited = getArticlesInited(getState());

        if (!articlesInited) {
            const urlParams = {
                order: articlePageSliceActions.setOrder,
                sort: articlePageSliceActions.setSort,
                search: articlePageSliceActions.setSearch,
                type: articlePageSliceActions.setType,
            };

            Object.entries(urlParams).forEach(([param, callBack]) => {
                const paramFromUrl = searchParams.get(param);
                if (paramFromUrl) {
                    // @ts-ignore
                    dispatch(callBack(paramFromUrl));
                }
            });

            dispatch(articlePageSliceActions.initState());
            dispatch(fetchArticlesList());
        }
    },
);
