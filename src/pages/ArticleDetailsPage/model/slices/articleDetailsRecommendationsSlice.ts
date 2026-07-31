import {
    createEntityAdapter,
    createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import {
    createError, createIdle, createLoading, createSuccess,
} from 'shared/api/types/apiResponse';

import { Article } from 'entities/Article';
import {
    fetchRecommendationsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchRecommendationsByArticleId/fetchRecommendationsByArticleId';
import {
    ArticleDetailsRecommendationsSchema,
} from '../types/ArticleDetailsRecommendationsSchema';

const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
);

const articleDetailsRecommendationsSlice = createSlice({
    name: 'articleDetailsRecommendationsSlice',
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
        data: createIdle(),
        ids: [],
        entities: {},
    }),
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendationsByArticleId.pending, (state) => {
                state.data = createLoading();
            })
            .addCase(fetchRecommendationsByArticleId.fulfilled, (
                state,
                action: PayloadAction<Article[]>,
            ) => {
                recommendationsAdapter.setAll(state, action.payload);
                state.data = createSuccess(null);
            })
            .addCase(fetchRecommendationsByArticleId.rejected, (state, action) => {
                state.data = createError(action.payload);
            });
    },
});

export const {
    reducer: articleDetailsRecommendationsReducer,
    actions: articleDetailsRecommendationsActions,
} = articleDetailsRecommendationsSlice;
