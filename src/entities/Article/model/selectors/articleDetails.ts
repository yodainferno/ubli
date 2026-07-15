import { StateSchema } from 'app/providers/StoreProvider';
import { ApiResponse, createIdle } from 'shared/api/types/apiResponse';
import { Article } from 'entities/Article';

export const getArticleDetailsData = (
    state: StateSchema,
): ApiResponse<Article, string> => state.articleDetails?.data ?? createIdle();
