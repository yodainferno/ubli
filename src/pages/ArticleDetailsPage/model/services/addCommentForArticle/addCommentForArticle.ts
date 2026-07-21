import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article';
import { ResponseStatus } from 'shared/api/types/apiResponse';
import {
    fetchCommentsByArticleId,
} from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string | undefined,
    ThunkConfig<string>
>(
    'ArticleDetailsPage/addCommentForArticle',
    async (text, thunkApi) => {
        const {
            extra,
            rejectWithValue,
            getState,
            dispatch,
        } = thunkApi;

        const userData = getUserAuthData(getState());
        const articleDetails = getArticleDetailsData(getState());
        let articleId;
        if (articleDetails.type === ResponseStatus.SUCCESS) {
            articleId = articleDetails.payload?.id;
        }

        if (!userData || !text || !articleId) {
            return rejectWithValue('Validation error');
        }

        try {
            const response = await extra.api.post<Comment>('/comments', {
                articleId,
                userId: userData.id,
                text,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(fetchCommentsByArticleId(articleId));

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
