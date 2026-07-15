import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    createError, createIdle, createLoading, createSuccess,
} from 'shared/api/types/apiResponse';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article } from '../types/article';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';

const initialState: ArticleDetailsSchema = {
    data: createIdle(),
};

export const articleDetailsSlice = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.data = createLoading();
            })
            .addCase(fetchArticleById.fulfilled, (
                state,
                action: PayloadAction<Article>,
            ) => {
                state.data = createSuccess(action.payload);
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.data = createError(action.payload);
            });
    },
});

export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;
