import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    createError, createIdle, createLoading, createSuccess,
} from 'shared/api/types/apiResponse';
import { Article, ArticleView } from 'entities/Article';
import { StateSchema } from 'app/providers/StoreProvider';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';

import { ARTICLES_VIEW_LOCALSTORAGE } from 'shared/consts/localstorage';
import { ArticlesPageSchema } from '../types/articlesPageSchema';

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlePageSlice = createSlice({
    name: 'articlePageSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        data: createIdle(),
        view: ArticleView.SMALL,
        ids: [],
        entities: {},
        page: 1,
        hasMore: true,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = Math.max(1, action.payload);
        },
        initState: (state) => {
            const rawValue = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE);
            state.view = rawValue ? rawValue as ArticleView : ArticleView.SMALL;

            state.limit = state.view === ArticleView.BIG ? 3 : 6;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state) => {
                state.data = createLoading();
            })
            .addCase(fetchArticlesList.fulfilled, (
                state,
                action: PayloadAction<Article[]>,
            ) => {
                articlesAdapter.addMany(state, action.payload);
                state.data = createSuccess(null);
                state.hasMore = action.payload.length > 0;
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.data = createError(action.payload);
            });
    },
});

export const {
    reducer: articlePageSliceReducer,
    actions: articlePageSliceActions,
} = articlePageSlice;
