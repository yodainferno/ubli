import { StateSchema } from 'app/providers/StoreProvider';
import { createIdle } from 'shared/api/types/apiResponse';

export const getArticleRecommendationsData = (
    state: StateSchema,
) => state.articleDetailsPage?.recommendations?.data ?? createIdle();
