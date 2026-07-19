import { StateSchema } from 'app/providers/StoreProvider';
import { createIdle } from 'shared/api/types/apiResponse';

export const getArticleCommentsData = (state: StateSchema) => state.articleDetailsComment?.data ?? createIdle();
