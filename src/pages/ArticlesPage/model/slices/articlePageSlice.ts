import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    createError, createIdle, createLoading, createSuccess,
} from 'shared/api/types/apiResponse';
import { Article, ArticleView } from 'entities/Article';
import { StateSchema } from 'app/providers/StoreProvider';

import { ARTICLES_VIEW_LOCALSTORAGE } from 'shared/consts/localstorage';
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
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
        ids: [],
        entities: {},
        _inited: false,
        //
        view: ArticleView.SMALL,
        //
        page: 1,
        limit: 9,
        hasMore: true,
        //
        order: 'desc',
        sort: ArticleSortField.CREATED,
        search: '',
        type: ArticleType.ALL,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = Math.max(1, action.payload);
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        },
        initState: (state) => {
            const rawValue = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE);
            state.view = rawValue ? rawValue as ArticleView : ArticleView.SMALL;
            state.limit = state.view === ArticleView.BIG ? 3 : 6;
            //
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                if (action.meta.arg?.replace) {
                    articlesAdapter.removeAll(state);
                }
                state.data = createLoading();
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                if (action.meta.arg?.replace) {
                    articlesAdapter.setAll(state, action.payload);
                } else {
                    articlesAdapter.addMany(state, action.payload);
                }
                state.data = createSuccess(null);
                state.hasMore = action.payload.length >= state.limit;
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
